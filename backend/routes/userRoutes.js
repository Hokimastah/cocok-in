const express_user = require('express');
const router_user = express_user.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
router_user.get('/profile', protect, getUserProfile);
module.exports = router_user;