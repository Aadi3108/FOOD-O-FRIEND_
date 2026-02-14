const recipeService = require('./recipe.service');
const flavorService = require('./flavor.service');
const Log = require('../models/Log');
const glycemicDB = require('../data/glycemicIndex.data');
const { calculateGlycemicRisk } = require('../utils/glycemic.util');

const THRESHOLDS = {
    normal: { moderate: 30, high: 50 },
    'weight-loss': { moderate: 25, high: 45 },
    'pre-diabetes': { moderate: 25, high: 40 },
    diabetes: { moderate: 25, high: 40 }
};

function generateAdvice(level) {
    if (level === "Low") return "Safe choice 👍";
    if (level === "Moderate") return "Eat moderately ⚠️";
    return "High risk ❌ Consider alternatives";
}

async function analyzeFood({ food, grams, mode, userId }) {
    // 1. Get Nutrition Info
    const nutritionData = await recipeService.getNutrition(food);

    const carbsPerServing = nutritionData.nutrition.carbs;
    const servingSize = nutritionData.nutrition.servingSize;

    if (!servingSize || servingSize <= 0) throw new Error("Invalid serving size data");

    const carbsPerGram = carbsPerServing / servingSize;
    const requestedCarbs = carbsPerGram * grams;

    // 2. Glycemic Risk Calculation
    const gi = glycemicDB[food.toLowerCase()] || 50; // default GI
    const glycemic = calculateGlycemicRisk(requestedCarbs, gi, mode);

    // 3. Get Flavor Suggestions
    const flavorPairings = await flavorService.getFlavorPairings(food);
    let alternatives = [];

    // Check if we should get alternatives based on glycemic risk or raw carbs
    if (glycemic.riskLevel === 'High' || glycemic.riskLevel === 'Moderate') {
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
        glycemicIndex: gi,
        glycemicLoad: glycemic.glycemicLoad,
        riskLevel: glycemic.riskLevel,
        score: glycemic.score,
        advice: generateAdvice(glycemic.riskLevel),
        flavorPairings,
        alternatives
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
            decision: result.riskLevel,
            score: result.score,
            message: result.advice,
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
