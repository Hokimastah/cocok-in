const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Rute untuk mendapatkan profil pengguna
// Middleware 'protect' akan dijalankan terlebih dahulu.
// Jika token valid, baru 'getUserProfile' akan dieksekusi.
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
