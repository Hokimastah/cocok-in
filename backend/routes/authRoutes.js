const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Rute untuk registrasi pengguna baru
// Frontend akan mengirim request POST ke http://localhost:5000/api/auth/register
router.post('/register', registerUser);

// Rute untuk login pengguna
// Frontend akan mengirim request POST ke http://localhost:5000/api/auth/login
router.post('/login', loginUser);

module.exports = router;
