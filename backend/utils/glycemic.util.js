exports.calculateGlycemicRisk = (carbs, gi, mode) => {
    const glycemicLoad = (gi * carbs) / 100;

    let riskLevel;
    let score;

    if (glycemicLoad <= 10) {
        riskLevel = "Low";
        score = 95 - glycemicLoad;
    }
    else if (glycemicLoad <= 19) {
        riskLevel = "Moderate";
        score = 75 - glycemicLoad;
    }
    else {
        riskLevel = "High";
        score = 50 - glycemicLoad;
    }

    // stricter scoring for diabetics
    if (mode === "diabetes") {
        score -= 10;
    }

    return {
        glycemicLoad: Number(glycemicLoad.toFixed(2)),
        riskLevel,
        score: Math.max(Math.round(score), 0)
    };
};
