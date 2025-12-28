import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

// PATIENT REGISTER 
export const registerPatientService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new ErrorHandler("All fields are required", 400);
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorHandler("User already registered", 409);
  }

  return await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "Patient",
  });
};

// LOGIN 
export const patientLoginService = async ({ email, password }) => {
  const user = await User.findOne({ email, role: "Patient" }).select("+password");

  if (!user) {
    throw new ErrorHandler("Patient not found", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  return user;
};

export const adminLoginService = async ({ email, password }) => {
  const user = await User.findOne({ email, role: "Admin" }).select("+password");

  if (!user) {
    throw new ErrorHandler("Admin not found", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  return user;
};

// ADD ADMIN 
export const addAdminService = async ({
  firstName,
  lastName,
  email,
  phone,
  governmentId,
  gender,
  password,
  dob
}) => {
  const adminExists = await User.findOne({ email });
  if (adminExists) {
    throw new ErrorHandler("Admin already exists", 409);
  }

  return await User.create({
    firstName,
    lastName,
    email,
    phone,
    governmentId,
    gender,
    password,
    role: "Admin",
  });
};

// ADD DOCTOR
export const addDoctorService = async (data, files) => {
  const {
    firstName,
    lastName,
    email,
    password,
    doctorDepartment,
  } = data;

  if (!files || !files.docAvatar) {
    throw new ErrorHandler("Doctor avatar is required", 400);
  }

  const doctorExists = await User.findOne({ email });
  if (doctorExists) {
    throw new ErrorHandler("Doctor already exists", 409);
  }

  const avatar = files.docAvatar;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    throw new ErrorHandler("Unsupported image format", 400);
  }

  const upload = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );

  return await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: upload.public_id,
      url: upload.secure_url,
    },
  });
};

// GET DOCTORS
export const getDoctorsService = async () => {
  return await User.find({ role: "Doctor" })
    .select("firstName lastName doctorDepartment email phone docAvatar")
    .sort({ lastName: 1 })
    .lean();
};

