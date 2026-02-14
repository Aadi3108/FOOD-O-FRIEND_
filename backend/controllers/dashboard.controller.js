const Log = require('../models/Log');
const SugarLog = require('../models/SugarLog');

// Since we don't have user authentication fully wired, we mock a single user
const DEMO_USER_ID = "demo-user";

exports.getDashboardStats = async (req, res, next) => {
    try {
        // 1. Get Sugar Records (Mock or DB)
        let summary = await SugarLog.find({ userId: DEMO_USER_ID }).sort({ date: -1 }).limit(3);

        // Fallback Mock if Empty (for initial demo)
        if (summary.length === 0) {
            summary = [
                { date: "2025-03-12", beforeLevel: 112, afterLevel: 165, status: "Stable" },
                { date: "2025-03-12", beforeLevel: 137, afterLevel: 173, status: "Elevated" },
                { date: "2025-03-12", beforeLevel: 62, afterLevel: 124, status: "Low" }
            ];
        }

        // 2. Calculate Total Carbs Today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const logsToday = await Log.find({
            timestamp: { $gte: startOfDay }
        });

        const totalCarbsConsumed = logsToday.reduce((acc, curr) => acc + (curr.nutrition.totalCarbs || 0), 0);
        const dailyGoal = 150; // hardcoded for demo profile

        // 3. Recovery Streak (Mock)
        const streak = {
            current: 108,
            goal: 154
        };

        res.status(200).json({
            success: true,
            data: {
                totalCarbs: {
                    consumed: Math.round(totalCarbsConsumed),
                    goal: dailyGoal,
                    remaining: Math.max(0, dailyGoal - totalCarbsConsumed)
                },
                sugarRecords: summary,
                streak
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getFoodLogs = async (req, res, next) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(20);
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        next(error);
    }
};

exports.getSugarLogs = async (req, res, next) => {
    try {
        let logs = await SugarLog.find().sort({ date: -1 }).limit(20);
        // Fallback Mock if Empty (for initial demo)
        if (logs.length === 0) {
            logs = [
                { date: new Date(), beforeLevel: 112, afterLevel: 165, status: "Stable", userId: DEMO_USER_ID },
                { date: new Date(Date.now() - 86400000), beforeLevel: 137, afterLevel: 173, status: "Elevated", userId: DEMO_USER_ID },
                { date: new Date(Date.now() - 172800000), beforeLevel: 62, afterLevel: 124, status: "Low", userId: DEMO_USER_ID }
            ];
        }
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        next(error);
    }
};
