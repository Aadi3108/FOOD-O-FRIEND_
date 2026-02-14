import axios from 'axios';
import { FOODOSCOPE_CONFIG } from './apiConfig';

const recipeApi = axios.create({
    baseURL: `${FOODOSCOPE_CONFIG.BASE_URL}${FOODOSCOPE_CONFIG.RECIPE_PATH}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FOODOSCOPE_CONFIG.BEARER_TOKEN}`,
    },
});

export const searchRecipesByTitle = async (title) => {
    if (!title || !title.trim()) return { success: true, data: [] };

    try {
        let response = await recipeApi.get(`/recipe-bytitle/recipeByTitle`, {
            params: { title: title.trim() }
        });

        if (response.data && response.data.success === false &&
            response.data.message && response.data.message.toLowerCase().includes('recipe title is required')) {
            const retryResponse = await recipeApi.get(`/recipe-bytitle/recipeByTitle`, {
                params: { Recipe_title: title.trim() }
            });
            response = retryResponse;
        }

        if (response.data && (response.data.success === false || response.data.success === "false")) {
            throw { message: response.data.message || 'API Error' };
        }

        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        const apiMessage = error.response?.data?.message || (error.message ? error.message : (typeof error === 'string' ? error : 'Search Failed'));
        throw { success: false, message: apiMessage };
    }
};

export const getRecipesInfo = async (page = 1, limit = 10) => {
    try {
        const response = await recipeApi.get(`/recipe/recipesinfo`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe info:', error);
        throw error.response ? error.response.data : { success: false, message: 'API Error' };
    }
};

export const getRecipeOfDay = async () => {
    try {
        const response = await recipeApi.get(`/recipe/recipe-day/with-ingredients-categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe of the day:', error);
        throw error.response ? error.response.data : { success: false, message: 'API Error' };
    }
};

export const getRecipeInstructions = async (recipeId) => {
    try {
        const response = await recipeApi.get(`/instructions/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe instructions:', error);
        throw error.response ? error.response.data : { success: false, message: 'API Error' };
    }
};

export const getRecipesByCarbs = async (minCarbs = 0, maxCarbs = 10, limit = 5) => {
    try {
        const response = await recipeApi.get(`/recipe-carbo/recipes-by-carbs`, {
            params: { minCarbs, maxCarbs, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes by carbs:', error);
        throw error.response ? error.response.data : { success: false, message: 'API Error' };
    }
};

/**
 * Endpoint: Ingredients by Flavor/Name
 * GET /ingredients/flavor/{flavor}
 */
export const getRecipesByIngredients = async (flavor, page = 1, limit = 10) => {
    try {
        const response = await recipeApi.get(`/ingredients/flavor/${encodeURIComponent(flavor)}`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes by ingredients:', error);
        throw error.response ? error.response.data : { success: false, message: 'API Error' };
    }
};

export default recipeApi;
