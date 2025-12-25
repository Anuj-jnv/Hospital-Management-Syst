import express from "express";
import {
  patientRegister,
  login,
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logoutPatient,
} from "../controllers/userController.js";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

//Public routes
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.get("/doctors", getAllDoctors);

// Authenticated routes
router.get(
  "/me",
  isAuthenticated,
  getUserDetails
);

router.get(
  "/logout",
  isAuthenticated,
  logoutPatient
);

// Admin routes
router.post(
  "/admin/addnew",
  isAuthenticated,
  authorizeRoles("Admin"),
  addNewAdmin
);

router.post(
  "/doctor/addnew",
  isAuthenticated,
  authorizeRoles("Admin"),
  addNewDoctor
);

export default router;