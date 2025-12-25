import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

import {
  registerPatientService,
  loginUserService,
  addAdminService,
  addDoctorService,
  getDoctorsService,
} from "../services/userService.js";

// PATIENT REGISTER 
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  if (!firstName || !lastName || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await registerPatientService(req.body);
  generateToken(user, "Patient registered successfully", 201, res);
});

//  LOGIN 
export const login = catchAsyncErrors(async (req, res, next) => {
  const user = await loginUserService(req.body);
  generateToken(user, "Login successful", 200, res);
});


// ADD ADMIN 
export const addNewAdmin = catchAsyncErrors(async (req, res) => {
  const admin = await addAdminService(req.body);

  res.status(201).json({
    success: true,
    message: "New admin created successfully",
    admin,
  });
});

// ADD DOCTOR 
export const addNewDoctor = catchAsyncErrors(async (req, res) => {
  const doctor = await addDoctorService(req.body, req.files);

  res.status(201).json({
    success: true,
    message: "Doctor added successfully",
    doctor,
  });
});

// GET DOCTORS 
export const getAllDoctors = catchAsyncErrors(async (req, res) => {
  const doctors = await getDoctorsService();

  res.status(200).json({
    success: true,
    doctors,
  });
});

// USER DETAILS 
export const getUserDetails = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// LOGOUT PATIENT/ADMIN
export const logoutPatient = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const logoutAdmin = logoutPatient;
