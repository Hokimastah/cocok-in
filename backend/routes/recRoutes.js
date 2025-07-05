const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middlewares/authMiddleware');

// Rute untuk mendapatkan rekomendasi jurusan
// Dilindungi, hanya pengguna yang sudah login dan menyelesaikan tes yang bisa mengakses
router.get('/', protect, getRecommendations);

module.exports = router;
