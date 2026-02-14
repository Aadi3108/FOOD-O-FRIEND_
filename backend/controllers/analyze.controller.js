const analyzeService = require('../services/analyze.service');

exports.analyzeFood = async (req, res, next) => {
    try {
        const { food, grams, mode, userId } = req.body;

        // Simple Validation
        if (!food || !grams || !mode) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const analysis = await analyzeService.analyzeFood({ food, grams, mode, userId });

        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        next(error);
    }
};

exports.getHistory = async (req, res, next) => {
    // Bonus: If time permits, fetch log history for user
    // This is a placeholder for future implementation
    res.status(200).json({ success: true, message: "History feature coming soon" });
};
