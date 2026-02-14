const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/data', dashboardController.getDashboardStats);
router.get('/food', dashboardController.getFoodLogs);
router.get('/sugar', dashboardController.getSugarLogs);

module.exports = router;
