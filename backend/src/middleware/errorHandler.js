const errorHandler = (err, req, res, next) => {
    console.error("Server error:", err);

    const statusCode = res.statusCode >= 400
        ? res.statusCode
        : 500;

    res.status(statusCode).json({
        message:
            err.message ||
            "Internal server error"
    });
};

module.exports = errorHandler;