const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyze.controller');

router.post('/analyze', analyzeController.analyzeFood);
router.get('/history', analyzeController.getHistory);

module.exports = router;
