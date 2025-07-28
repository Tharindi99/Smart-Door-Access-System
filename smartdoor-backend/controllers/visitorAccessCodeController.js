const { VisitorAccessCode } = require('../models');

exports.createVisitorAccessCode = async (req, res) => {
  try {
    const {
      visitorId,    // NIC or any unique identifier
      doorId,
      validUntil,
      startTime,
      endTime,
      employeeId
    } = req.body;

    // Validate
    if (!visitorId || !doorId || !validUntil || !startTime || !endTime || !employeeId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the record WITHOUT code first
    const accessCodeRequest = await VisitorAccessCode.create({
      visitorId,
      doorId,
      validUntil,
      startTime,
      endTime,
      createdByUserId: employeeId
    });

    // Generate random access code AFTER creation
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Update the newly created record with the generated code
    accessCodeRequest.code = generatedCode;
    await accessCodeRequest.save();

    // Send response with the updated record
    res.status(201).json({
      message: 'Visitor access code created successfully',
      accessCodeRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
