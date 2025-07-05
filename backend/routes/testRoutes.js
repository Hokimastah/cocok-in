const express_test = require('express');
const router_test = express_test.Router();
const { getTestQuestions, submitTest } = require('../controllers/testController');
const { protect: protect_test } = require('../middlewares/authMiddleware');
router_test.get('/questions', protect_test, getTestQuestions);
router_test.post('/submit', protect_test, submitTest);
module.exports = router_test;