const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:5000/api/recipes';

async function debug() {
    try {
        const output = {};
        console.log("--- Searching for 'tomato' ---");
        const searchRes = await axios.get(`${BASE_URL}/recipe-bytitle/recipeByTitle`, { params: { title: 'tomato' } });
        const firstMatch = searchRes.data.data[0];

        if (firstMatch) {
            output.searchResult = firstMatch;
            const id = firstMatch.Recipe_id;

            const candidates = [
                `/recipe/${id}`,
                `/recipes/${id}`,
                `/recipe/details/${id}`,
                `/recipe/id/${id}`,
                `/recipe/with-ingredients-categories/${id}`,
                `/recipe/get/${id}`
            ];

            output.probes = {};

            for (const path of candidates) {
                try {
                    console.log(`Probing ${path}...`);
                    const res = await axios.get(`${BASE_URL}${path}`);
                    output.probes[path] = { status: res.status, dataKeys: Object.keys(res.data) };
                    console.log(`SUCCESS: ${path}`);
                } catch (e) {
                    output.probes[path] = { status: e.response?.status || 'Error', msg: e.message };
                }
            }

            try {
                const instrRes = await axios.get(`${BASE_URL}/instructions/${id}`);
                output.instructions = instrRes.data;
            } catch (e) { output.instructionsError = e.message; }

            try {
                const infoRes = await axios.get(`${BASE_URL}/recipe/recipesinfo`, { params: { limit: 1 } });
                if (infoRes.data.payload?.data?.length > 0) {
                    output.recipesInfoSample = infoRes.data.payload.data[0];
                }
            } catch (e) { output.infoError = e.message; }
        }

        fs.writeFileSync('debug_res.json', JSON.stringify(output, null, 2));
        console.log("Done");

    } catch (error) {
        console.error("Error:", error.message);
    }
}

debug();
