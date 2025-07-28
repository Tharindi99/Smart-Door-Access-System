const express = require('express');
const router = express.Router();
const visitorAccessCodeController = require('../controllers/visitorAccessCodeController');

// POST /visitor-access-code (Generate visitor access code)
router.post('/visitor-access-code', visitorAccessCodeController.createVisitorAccessCode);


module.exports = router;
