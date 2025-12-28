class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // MONGODB DUPLICATE KEY 
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ErrorHandler(
      `Duplicate value entered for ${field}`,
      400
    );
  }

  //JWT ERRORS 
  if (err.name === "JsonWebTokenError") {
    error = new ErrorHandler("Invalid token. Please login again.", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new ErrorHandler("Session expired. Please login again.", 401);
  }

  // MONGODB CAST ERROR 
  if (err.name === "CastError") {
    error = new ErrorHandler(
      `Invalid ${err.path}: ${err.value}`,
      400
    );
  }

  // MONGOOSE VALIDATION ERRORS 
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );
    error = new ErrorHandler(messages.join(", "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default ErrorHandler;
