import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    // CORE ACCOUNT 

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Provide a valid email"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // never return password
    },

    role: {
      type: String,
      enum: ["Patient", "Doctor", "Admin"],
      default: "Patient", // 🔒 public register = Patient only
      immutable: true, // role cannot be changed accidentally
    },

    /* ================= PATIENT PROFILE (OPTIONAL) ================= */

    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
    },

    /* Government ID (optional & country-agnostic) */
    governmentId: {
      type: String,
      minlength: 8,
      maxlength: 20,
      select: false, // sensitive info
    },
   
  
  
  
  doctorDepartment:{
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
    

    
  },
  { timestamps: true }
);

/* ================= PASSWORD HASHING ================= */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ================= PASSWORD COMPARISON ================= */
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

/* ================= JWT TOKEN ================= */
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

/* ================= FORGOT PASSWORD TOKEN ================= */
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
