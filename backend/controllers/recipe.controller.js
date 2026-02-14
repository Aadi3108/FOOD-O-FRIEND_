const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const RECIPE_API_URL = process.env.RECIPEDB_API_URL || 'http://cosylab.iiitd.edu.in:6969/recipe2-api';
const FLAVOR_API_URL = process.env.FLAVORDB_API_URL || 'http://cosylab.iiitd.edu.in:6969/flavordb';
const BEARER_TOKEN = process.env.COSYLAB_BEARER_TOKEN;

const apiClient = axios.create({
    headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

// Helper to forward requests
const forwardRequest = async (res, method, url, params = {}, data = {}) => {
    try {
        const config = { method, url, params, data };
        const response = await apiClient(config);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Proxy Error [${url}]:`, error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ success: false, message: 'Backend Proxy Error' });
        }
    }
};

exports.proxyGetRecipeOfDay = async (req, res) => {
    const url = `${RECIPE_API_URL}/recipe/recipe-day/with-ingredients-categories`;
    await forwardRequest(res, 'GET', url);
};

exports.proxySearchByTitle = async (req, res) => {
    const url = `${RECIPE_API_URL}/recipe-bytitle/recipeByTitle`;
    await forwardRequest(res, 'GET', url, req.query);
};

exports.proxyGetRecipesInfo = async (req, res) => {
    const url = `${RECIPE_API_URL}/recipe/recipesinfo`;
    await forwardRequest(res, 'GET', url, req.query);
};

exports.proxyGetInstructions = async (req, res) => {
    const { id } = req.params;
    const url = `${RECIPE_API_URL}/instructions/${id}`;
    await forwardRequest(res, 'GET', url);
};

exports.proxyGetByCarbs = async (req, res) => {
    const url = `${RECIPE_API_URL}/recipe-carbo/recipes-by-carbs`;
    await forwardRequest(res, 'GET', url, req.query);
};

exports.proxyGetByFlavor = async (req, res) => {
    const { flavor } = req.params;
    const url = `${RECIPE_API_URL}/ingredients/flavor/${encodeURIComponent(flavor)}`;
    await forwardRequest(res, 'GET', url, req.query);
};

// Keep existing methods if needed, or deprecate them
exports.getRecommendations = async (req, res, next) => {
    // ... existing mock data logic ...
    res.status(200).json({ success: true, message: "Deprecated. Use proxy endpoints." });
};

exports.searchByIngredients = async (req, res, next) => {
    // ... existing mock logic ...
    res.status(200).json({ success: true, message: "Deprecated. Use proxy endpoints." });
};

