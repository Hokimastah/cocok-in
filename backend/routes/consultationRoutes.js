const express = require('express');
const router = express.Router();
const { getConsultants } = require('../controllers/consultationController');
const { protect } = require('../middlewares/authMiddleware');

// Rute untuk mendapatkan daftar konsultan
// URL-nya akan menjadi: GET /api/consultations/
router.get('/', protect, getConsultants);

// Pastikan baris ini ada untuk mengekspor rute
module.exports = router;
