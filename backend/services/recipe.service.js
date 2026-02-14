const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const RECIPEDB_API = process.env.RECIPEDB_API_URL;
const BEARER_TOKEN = process.env.COSYLAB_BEARER_TOKEN;

const recipeApi = axios.create({
    baseURL: RECIPEDB_API,
    headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
    }
});

// Initial food database for fallback/mock
const MOCK_FOODS = [
    { title: "Apple", carbsPer100g: 14, servingSize: 100 },
    { title: "Banana", carbsPer100g: 23, servingSize: 100 },
    { title: "Rice (White, Cooked)", carbsPer100g: 28, servingSize: 100 },
    { title: "Bread (White)", carbsPer100g: 49, servingSize: 30 },
    { title: "Pizza", carbsPer100g: 30, servingSize: 100 },
    { title: "Pasta (Cooked)", carbsPer100g: 25, servingSize: 100 },
    { title: "Chicken Breast", carbsPer100g: 0, servingSize: 100 },
    { title: "Broccoli", carbsPer100g: 7, servingSize: 100 },
    { title: "Oats", carbsPer100g: 12, servingSize: 100 },
    { title: "Burger", carbsPer100g: 30, servingSize: 200 }
];

/**
 * Fetches nutrition data from CoSyLab Recipe API with fallback to MOCK_FOODS
 */
async function getNutrition(foodTitle) {
    try {
        // 1. Search for the recipe via CoSyLab
        const searchRes = await recipeApi.get(`/recipe-bytitle/recipeByTitle`, {
            params: { title: foodTitle.trim() }
        });

        const recipeList = searchRes.data?.data || [];

        if (recipeList.length > 0) {
            const recipe = recipeList[0];
            const carbsValue = recipe.total_carbs || recipe.Carbohydrates || 20;

            return {
                title: recipe.Recipe_title || recipe.title,
                nutrition: {
                    carbs: parseFloat(String(carbsValue).replace('g', '')) || 20,
                    servingSize: 100,
                    unit: 'g'
                }
            };
        }

        // If not found in API, throw to trigger fallback
        throw new Error("Food item not found in CoSyLab database");

    } catch (error) {
        console.warn("API Call Failed, searching mock data as fallback...", error.message);

        // Fallback to Mock Data
        const normalize = (s) => s.toLowerCase().trim();
        const match = MOCK_FOODS.find(f =>
            normalize(f.title).includes(normalize(foodTitle)) ||
            normalize(foodTitle).includes(normalize(f.title))
        );

        if (match) {
            return {
                title: match.title,
                nutrition: {
                    carbs: match.carbsPer100g,
                    servingSize: match.servingSize,
                    unit: 'g'
                }
            };
        }

        throw new Error(error.message || "Failed to fetch nutrition data");
    }
}

module.exports = { getNutrition };
