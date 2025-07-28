// routes/accessRequestRoutes.js
const express = require('express');
const router = express.Router();
const accessRequestController = require('../controllers/accessRequestController');

// POST /unlock-visitor - Unlock the door using access code
router.post('/unlock-visitor', accessRequestController.unlockVisitorDoor);

// POST /failed-unlock-attempt - Handle failed unlock attempts
router.post('/failed-unlock-attempt', accessRequestController.failedUnlockAttempt);

// POST /unlock-employee (Employee login via mobile app)
router.post('/unlock-employee', accessRequestController.unlockDoorWithMobileApp);


module.exports = router;
