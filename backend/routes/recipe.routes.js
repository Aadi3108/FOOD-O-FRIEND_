const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

// Proxy Routes matching frontend expectations
router.get('/recipe/recipe-day/with-ingredients-categories', recipeController.proxyGetRecipeOfDay);
router.get('/recipe-bytitle/recipeByTitle', recipeController.proxySearchByTitle);
router.get('/recipe/recipesinfo', recipeController.proxyGetRecipesInfo);
router.get('/instructions/:id', recipeController.proxyGetInstructions);
router.get('/recipe-carbo/recipes-by-carbs', recipeController.proxyGetByCarbs);
router.get('/ingredients/flavor/:flavor', recipeController.proxyGetByFlavor);

// Deprecated / Legacy
router.get('/recommendations', recipeController.getRecommendations);
router.post('/search-by-ingredients', recipeController.searchByIngredients);

module.exports = router;
