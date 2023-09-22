const express = require('express');
const router = express.Router();
const { getUsersByType, createUser,updateUser, deleteUser} = require('../controllers/admin.controllers');

// Get all users by userType
router.get('/', getUsersByType);
 console.log("xyz")
// Create a new user
router.post('/', createUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
