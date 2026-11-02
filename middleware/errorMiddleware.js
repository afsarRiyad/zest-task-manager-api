const errorMiddleware = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message ;

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }
    if (!err.isOperational && statusCode === 500) {
        console.error("BUG:", err);
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorMiddleware;