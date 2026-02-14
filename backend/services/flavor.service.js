// backend/services/flavor.service.js

const ALTERNATIVES_DB = {
    rice: ["Cauliflower Rice", "Quinoa", "Shirataki Noodles"],
    pasta: ["Zucchini Noodles", "Squash Spaghetti", "Shirataki Pasta"],
    bread: ["Lettuce Wrap", "Cloud Bread", "Almond Flour Bread"],
    potato: ["Mashed Cauliflower", "Radish", "Rutabaga"],
    sugar: ["Stevia", "Erythritol", "Monk Fruit"],
    pizza: ["Cauliflower Crust Pizza", "Portobello Pizza"],
    fries: ["Baked Zucchini Fries", "Carrot Sticks"] // Low carb options
};

const FLAVOR_PAIRINGS = {
    active: ["garlic", "cheese", "basil", "tomato"],
    sweet: ["cinnamon", "vanilla", "nutmeg"],
    savory: ["thyme", "rosemary", "black pepper"]
};

// Simple heuristic based on ingredient type
const getFlavorProfile = (food) => {
    const f = food.toLowerCase();
    if (f.includes('cake') || f.includes('ice cream') || f.includes('fruit')) return FLAVOR_PAIRINGS.sweet;
    if (f.includes('chicken') || f.includes('beef') || f.includes('soup')) return FLAVOR_PAIRINGS.savory;
    return FLAVOR_PAIRINGS.active;
};

const axios = require('axios');
const FLAVOR_DB_API = process.env.FLAVORDB_API_URL || 'https://coslab.iiitd.edu.in/flavordb/api';

async function getFlavorPairings(foodName) {
    try {
        // ---------------------------------------------------------
        // 🔌 REAL API INTEGRATION (Replacing Mock Data)
        // ---------------------------------------------------------
        // First find the entity ID
        const searchRes = await axios.get(`${FLAVOR_DB_API}/entities`, {
            params: { name: foodName }
        });

        if (searchRes.data && searchRes.data.length > 0) {
            const entityId = searchRes.data[0].id;
            // Get detailed pairings for that ID
            const detailRes = await axios.get(`${FLAVOR_DB_API}/entities/${entityId}`);
            return detailRes.data.pairings || getFlavorProfile(foodName);
        }

        return getFlavorProfile(foodName);
    } catch (error) {
        console.warn("FlavorDB API Failed, using heuristic fallback...");
        return getFlavorProfile(foodName);
    }
}

async function getAlternatives(foodName) {
    try {
        // Mock DB lookup first
        const key = Object.keys(ALTERNATIVES_DB).find(k => foodName.toLowerCase().includes(k));
        if (key) return ALTERNATIVES_DB[key];

        // 🔌 REAL API INTEGRATION POTENTIAL
        // Some FlavorDB instances have an /alternatives or /substitutes endpoint
        // const res = await axios.get(`${FLAVOR_DB_API}/substitutes?name=${foodName}`);
        // if (res.data) return res.data;

        return ["Green Leafy Vegetables", "Nuts", "Berries"];
    } catch (error) {
        return ["Green Leafy Vegetables", "Nuts", "Berries"];
    }
}

module.exports = {
    getFlavorPairings,
    getAlternatives
};
