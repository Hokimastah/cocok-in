/* 6. backend/routes/consultationRoutes.js */
const express_consult = require('express');
const router_consult = express_consult.Router();
const { getConsultants } = require('../controllers/consultationController');
const { protect: protect_consult } = require('../middlewares/authMiddleware');
router_consult.get('/', protect_consult, getConsultants);
module.exports = router_consult;
