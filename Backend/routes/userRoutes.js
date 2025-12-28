import express from "express";
import {
  patientRegister,
  patientLogin,
  adminLogin,
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logoutPatient,
} from "../controllers/userController.js";

import {
  postAppointment
} from "../controllers/appointmentController.js";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

//Public routes
router.get("/doctors", getAllDoctors);

// Patient routes
router.post("/patient/register", patientRegister);
router.post("/patient/login", patientLogin);
router.get("/patient/me", isAuthenticated, getUserDetails);
router.post("/post", isAuthenticated, authorizeRoles("Patient"), postAppointment);


router.get("/logout", isAuthenticated, logoutPatient);// Both Patient and Admin can logout


// Admin routes
router.post("/admin/login", adminLogin);
router.post("/admin/addnew", isAuthenticated, authorizeRoles("Admin"), addNewAdmin);
router.post("/doctor/addnew", isAuthenticated, authorizeRoles("Admin"), addNewDoctor);
router.get("/admin/me", isAuthenticated, getUserDetails);

export default router;