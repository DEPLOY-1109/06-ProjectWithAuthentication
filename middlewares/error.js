// creating class to fetch status code 
class ErrorHandler extends Error {
    constructor(message, statusCode) {   
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;

// ---------------Error Middleware
export const ErrorMiddleware = (err, req, res, next) => {
    // console.log("Error Occured");
    // console.log(err.message);

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // return res.status(404).json({
    return res.status(err.statusCode).json({
        success: false,
        // message: "Invalid ID",
        message: err.message,
    })
}