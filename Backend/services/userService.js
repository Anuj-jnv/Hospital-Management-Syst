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
export const loginUserService = async ({ email, password, role }) => {
  if (!email || !password || !role) {
    throw new ErrorHandler("Email, password and role are required", 400);
  }

  const user = await User.findOne({ email, role }).select("+password");
  if (!user) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  return user; // controller will generate token
};

// ADD ADMIN 
export const addAdminService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const adminExists = await User.findOne({ email });
  if (adminExists) {
    throw new ErrorHandler("Admin already exists", 409);
  }

  return await User.create({
    firstName,
    lastName,
    email,
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
  return await User.find({ role: "Doctor" }).select(
    "firstName lastName doctorDepartment"
  );
};
