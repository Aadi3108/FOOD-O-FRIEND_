const recipeService = require('./recipe.service');
const flavorService = require('./flavor.service');
const Log = require('../models/Log');

const THRESHOLDS = {
    normal: { moderate: 30, high: 50 },
    'weight-loss': { moderate: 25, high: 45 },
    'pre-diabetes': { moderate: 25, high: 40 },
    diabetes: { moderate: 25, high: 40 }
};

async function analyzeFood({ food, grams, mode, userId }) {
    // 1. Get Nutrition Info
    const nutritionData = await recipeService.getNutrition(food);

    // Calculate carbs per gram
    // Assuming nutritionData returns { carbs: totalCarbsInServing, servingSize: servingSizeGrams }
    const carbsPerServing = nutritionData.nutrition.carbs;
    const servingSize = nutritionData.nutrition.servingSize;

    if (!servingSize || servingSize <= 0) throw new Error("Invalid serving size data");

    const carbsPerGram = carbsPerServing / servingSize;
    const requestedCarbs = carbsPerGram * grams;

    // 2. Determine Thresholds
    const userMode = THRESHOLDS[mode] || THRESHOLDS['normal'];
    let decision = 'Comfortable';
    let color = 'green';
    let message = "Great choice within your limits!";

    if (requestedCarbs >= userMode.high) {
        decision = 'High';
        color = 'red';
        message = "Caution: This portion exceeds your recommended carb limit.";
    } else if (requestedCarbs >= userMode.moderate) {
        decision = 'Moderate';
        color = 'yellow';
        message = "Moderate intake. Consider smaller portions or balancing with protein.";
    }

    // 3. Get Flavor Suggestions (if needed or always)
    const flavorPairings = await flavorService.getFlavorPairings(food);
    let alternatives = [];

    if (decision === 'High' || decision === 'Moderate') {
        alternatives = await flavorService.getAlternatives(food);
    }

    const result = {
        food,
        grams,
        mode,
        nutrition: {
            carbsPerServing,
            servingSizeInGrams: servingSize,
            totalCarbs: parseFloat(requestedCarbs.toFixed(1))
        },
        decision,
        color, // backend suggestion for frontend
        message,
        alternatives,
        flavorPairings
    };

    // 4. Log to Database
    try {
        const newLog = new Log({
            food,
            grams,
            mode,
            nutrition: {
                carbsPerServing,
                servingSizeInGrams: servingSize,
                totalCarbs: result.nutrition.totalCarbs
            },
            decision,
            score: 100 - result.nutrition.totalCarbs, // Placeholder score algo
            message,
            userId: userId || null
        });
        await newLog.save();
    } catch (err) {
        console.error("Logging Error:", err);
        // Don't fail the request if logging fails
    }

    return result;
}

module.exports = { analyzeFood };
