const handleError = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined; // undefined instead of {}
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: stack
    });
};

module.exports = handleError;
