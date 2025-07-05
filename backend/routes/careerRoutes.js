const express = require('express');
const router = express.Router();
const { getTrendingCareers } = require('../controllers/careerController');
const { protect } = require('../middlewares/authMiddleware');

// Rute untuk mendapatkan karir yang sedang tren
router.get('/', protect, getTrendingCareers);

module.exports = router;
