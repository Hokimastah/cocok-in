const express = require('express');
const router = express.Router();
const { getTestQuestions, submitTest } = require('../controllers/testController');
const { protect } = require('../middlewares/authMiddleware');

// Rute untuk mendapatkan semua pertanyaan tes
// Dilindungi, hanya user yang login bisa mengakses
router.get('/questions', protect, getTestQuestions);

// Rute untuk mengirimkan jawaban tes
// Dilindungi, hanya user yang login bisa mengirimkan
router.post('/submit', protect, submitTest);

module.exports = router;
