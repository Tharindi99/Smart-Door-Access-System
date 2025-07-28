const { AccessRequest, VisitorAccessCode, Door, SecurityAlert, User } = require('../models');
const { Op } = require('sequelize');
const sendSMS = require('../services/sendSMS');  // Import sendSMS function

// POST /unlock-visitor – Validate visitor access code and unlock door
exports.unlockVisitorDoor = async (req, res) => {
  try {
    const { code, doorId, visitorId } = req.body;

    // Validate required fields
    if (!code || !doorId) {
      return res.status(400).json({ error: 'Missing code or doorId' });
    }

    // Find the VisitorAccessCode by code
    const accessCode = await VisitorAccessCode.findOne({
      where: { code }
    });

    let status = 'failed';

    if (accessCode) {
      const now = new Date();
      if (
        now <= accessCode.validUntil &&
        now >= accessCode.startTime &&
        now <= accessCode.endTime
      ) {
        status = 'success';
      }
    }

    // Create the AccessRequest record
    const accessRequest = await AccessRequest.create({
      timestamp: new Date(),
      method: 'visitor-code',
      status,
      visitorAccessCodeId: accessCode ? accessCode.id : null,
      doorId
    });

    if (status === 'success') {
      return res.status(200).json({
        message: 'Door unlocked successfully',
        accessRequest
      });
    } else {
      return res.status(401).json({
        error: 'Invalid or expired code'
      });
    }

  } catch (err) {
    console.error('unlockVisitorDoor error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// POST /failed-unlock-attempt  – Log failed unlock attempt
exports.failedUnlockAttempt = async (req, res) => {
  try {
    const { code, doorId, visitorId } = req.body;

    // Log the failed access attempt
    const failedAttempt = await AccessRequest.create({
      timestamp: new Date(),
      method: 'visitor-code',
      status: 'failed',
      visitorId,
      doorId
    });

    // Check for 3 failed attempts in the last 24 hours
    const failedAttempts = await AccessRequest.count({
      where: {
        doorId,
        visitorId,
        status: 'failed',
        timestamp: {
          [Op.gte]: new Date() - 24 * 60 * 60 * 1000  // Last 24 hours
        }
      }
    });

    if (failedAttempts >= 3) {
      // Trigger security alert (send SMS to security officer)
      const securityOfficerPhone = '+4917621763862'; 
      const message = `Security Alert: Multiple failed access attempts on door ${doorId} by visitor ${visitorId}.`;

      // Send SMS to the security officer
      await sendSMS(securityOfficerPhone, message);

      return res.status(403).json({ error: 'Too many failed attempts. Security alert triggered.' });
    }

    res.status(400).json({ error: 'Invalid code. Please try again.' });

  } catch (err) {
    console.error('failedUnlockAttempt error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /unlock-employee  – Unlock door via mobile app (employee)
exports.unlockDoorWithMobileApp = async (req, res) => {
  try {
    const { username, password, doorId } = req.body;  // Receive username, password, doorId

    if (!username || !password || !doorId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the employee by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Compare the provided password with the stored hashed password (bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Find the door from the database (ensure it exists)
    const door = await Door.findByPk(doorId);

    if (!door) {
      return res.status(404).json({ error: 'Door not found' });
    }

    // Log the access request for the employee
    const newAccessRequest = await AccessRequest.create({
      timestamp: new Date(),
      method: 'mobile-app',
      status: 'success',
      userId: user.id,
      doorId: door.id
    });

    // Here you would trigger actual hardware to unlock the door (simulate for now)
    res.status(200).json({ message: 'Door unlocked successfully', accessRequest: newAccessRequest });

  } catch (err) {
    console.error('unlockDoorWithMobileApp error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
