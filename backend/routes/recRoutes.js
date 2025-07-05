const express_rec = require('express');
const router_rec = express_rec.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const { protect: protect_rec } = require('../middlewares/authMiddleware');
router_rec.get('/', protect_rec, getRecommendations);
module.exports = router_rec;
