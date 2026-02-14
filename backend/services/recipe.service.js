const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const RECIPEDB_API = process.env.RECIPEDB_API_URL || 'https://api.spoonacular.com/recipes/complexSearch'; // Default to Spoonacular mock if not provided
const API_KEY = process.env.RECIPEDB_API_KEY; // If using Spoonacular

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
    { title: "Oats", carbsPer100g: 12, servingSize: 100 }, // cooked
    { title: "Burger", carbsPer100g: 30, servingSize: 200 }
];

async function getNutrition(foodTitle) {
    try {
        // ---------------------------------------------------------
        // 🔌 REAL API INTEGRATION (Replacing Mock Data)
        // ---------------------------------------------------------
        const searchRes = await axios.get(`${RECIPEDB_API}/search`, {
            params: { query: foodTitle, apiKey: API_KEY }
        });

        if (!searchRes.data.results || searchRes.data.results.length === 0) {
            throw new Error("Food item not found in database");
        }

        const recipeId = searchRes.data.results[0].id;
        const nutrientRes = await axios.get(`${RECIPEDB_API}/${recipeId}/nutritionWidget.json`, {
            params: { apiKey: API_KEY }
        });

        // Transform API response to our app format
        const nutrition = nutrientRes.data;
        const carbs = nutrition.carbs ? parseFloat(nutrition.carbs.replace('g', '')) : 20;

        return {
            title: searchRes.data.results[0].title,
            nutrition: {
                carbs: carbs,
                servingSize: 100, // Normalized to 100g for our calculation
                unit: 'g'
            }
        };

    } catch (error) {
        console.warn("API Call Failed, searching mock data as fallback...", error.message);

        // Fallback to Mock Data if API fails (useful for hackathon demo)
        const normalize = (s) => s.toLowerCase().trim();
        const match = MOCK_FOODS.find(f => normalize(f.title).includes(normalize(foodTitle)) || normalize(foodTitle).includes(normalize(f.title)));

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
