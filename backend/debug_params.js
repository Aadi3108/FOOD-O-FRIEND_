const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/recipes';

// We know this ID exists from previous debug: 2726 (Tomato Bredie)
// Or we can use one from recipesinfo sample: 2613 (Magpie's Easy Falafel Cakes)
const TEST_ID = "2726";
const TEST_TITLE = "Tomato";

async function probe() {
    try {
        console.log("--- Probing /recipe/recipesinfo filtering ---");

        const queries = [
            { params: { Recipe_id: TEST_ID }, name: "Recipe_id" },
            { params: { id: TEST_ID }, name: "id" },
            { params: { recipe_id: TEST_ID }, name: "recipe_id" },
            { params: { _id: "6405721fa13d0d2d35890ddd" }, name: "_id" }, // ID from previous search result
            { params: { title: TEST_TITLE }, name: "title" },
            { params: { Recipe_title: TEST_TITLE }, name: "Recipe_title" },
            { params: { q: TEST_TITLE }, name: "q" },
            { params: { search: TEST_TITLE }, name: "search" }
        ];

        for (const q of queries) {
            try {
                // Add limit to avoid fetching too much if filter fails
                const res = await axios.get(`${BASE_URL}/recipe/recipesinfo`, { params: { ...q.params, limit: 5 } });
                const count = res.data.payload?.data?.length;
                console.log(`Query [${q.name}]: Returned ${count} results`);

                if (count > 0 && count < 10) { // If it filtered specifically
                    const first = res.data.payload.data[0];
                    console.log(`   -> First match: ${first.Recipe_title} (ID: ${first.Recipe_id})`);
                }
            } catch (e) {
                console.log(`Query [${q.name}]: Failed - ${e.message}`);
            }
        }

    } catch (e) {
        console.error("Fatal:", e.message);
    }
}

probe();
