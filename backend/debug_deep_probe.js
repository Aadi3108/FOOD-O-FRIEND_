const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:5000/api/recipes';
const TEST_RECIPE_ID = "2726"; // Tomato Bredie
const TEST_MONGO_ID = "6405721fa13d0d2d35890ddd"; // Tomato Bredie _id

async function probe() {
    const output = { success: [], failures: [] };

    // 1. Probe for ID-based endpoints
    const idPaths = [
        `/recipe/${TEST_MONGO_ID}`,
        `/recipes/${TEST_MONGO_ID}`,
        `/recipe/details/${TEST_MONGO_ID}`,
        `/recipe-byid/recipeById`,
        `/recipe-byid/recipe`,
        `/recipe/recipeById`,
        `/recipe/get-by-id`
    ];

    for (const path of idPaths) {
        try {
            // Try with query params too for the generic ones
            const config = { params: { id: TEST_RECIPE_ID, _id: TEST_MONGO_ID, recipeId: TEST_RECIPE_ID } };
            const res = await axios.get(`${BASE_URL}${path}`, config);
            output.success.push({ path, status: res.status, keys: Object.keys(res.data) });
            console.log(`HIT: ${path}`);
        } catch (e) {
            output.failures.push({ path, error: e.message, status: e.response?.status });
        }
    }

    // 2. Probe recipesinfo with POST and more params
    try {
        console.log("Probing recipesinfo POST...");
        const res = await axios.post(`${BASE_URL}/recipe/recipesinfo`, {
            Recipe_id: TEST_RECIPE_ID,
            id: TEST_RECIPE_ID,
            title: "Tomato Bredie"
        });
        output.success.push({ path: 'POST /recipe/recipesinfo', status: res.status, data: res.data });
    } catch (e) {
        output.failures.push({ path: 'POST /recipe/recipesinfo', error: e.message });
    }

    fs.writeFileSync('debug_deep_out.json', JSON.stringify(output, null, 2));
    console.log("Probe finished.");
}

probe();
