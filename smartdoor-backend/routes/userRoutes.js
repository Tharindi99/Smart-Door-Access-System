// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
router.get('/', userController.getAllUsers);          // Get all users
router.get('/:id', userController.getUserById);      // Get user by ID
router.post('/', userController.createUser);         // Create a new user
router.put('/:id', userController.updateUser);       // Update user
router.delete('/:id', userController.deleteUser);    // Delete user

module.exports = router;

