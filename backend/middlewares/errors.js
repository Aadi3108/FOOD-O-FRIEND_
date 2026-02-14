const errorMiddleware = (err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong on our end."
    });
};

module.exports = errorMiddleware;
