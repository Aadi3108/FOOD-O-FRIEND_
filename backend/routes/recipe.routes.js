const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

router.get('/recommendations', recipeController.getRecommendations);
router.post('/search-by-ingredients', recipeController.searchByIngredients);

module.exports = router;
