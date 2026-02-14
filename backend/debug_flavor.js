const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:5000/api/recipes'; // This routes to FLAVOR_APP_URL via some path?
// Wait, backend proxy for recipes is /api/recipes -> recipe2-api
// Backend doesn't proxy flavordb yet.

const FLAVOR_URL = 'http://cosylab.iiitd.edu.in:6969/flavordb';
const TEST_ID = "2726";

async function probe() {
    try {
        console.log("Probing FlavorDB...");
        const paths = [
            `/entity_details?id=${TEST_ID}`,
            `/recipe/${TEST_ID}`,
            `/food/${TEST_ID}`,
            `/search?q=Tomato`
        ];

        for (const p of paths) {
            try {
                const res = await axios.get(`${FLAVOR_URL}${p}`);
                console.log(`HIT: ${p}`, Object.keys(res.data));
            } catch (e) {
                console.log(`MISS: ${p} (${e.response?.status})`);
            }
        }
    } catch (e) {
        console.error(e.message);
    }
}

probe();
