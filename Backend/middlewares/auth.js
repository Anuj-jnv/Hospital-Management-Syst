
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

// AUTHENTICATION 
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
});


// AUTHORIZATION 
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
