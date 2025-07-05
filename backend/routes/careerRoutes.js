const express_career = require('express');
const router_career = express_career.Router();
const { getTrendingCareers } = require('../controllers/careerController');
const { protect: protect_career } = require('../middlewares/authMiddleware');
router_career.get('/', protect_career, getTrendingCareers);
module.exports = router_career;