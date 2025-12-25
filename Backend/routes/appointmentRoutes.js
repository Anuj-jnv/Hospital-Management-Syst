import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ===================== PATIENT ===================== */
/* Book appointment */
router.post(
  "/post",
  isAuthenticated,
  authorizeRoles("Patient"),
  postAppointment
);

/* ===================== ADMIN ===================== */
/* View all appointments */
router.get(
  "/getall",
  isAuthenticated,
  authorizeRoles("Admin"),
  getAllAppointments
);

/* Update appointment status */
router.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("Admin"),
  updateAppointmentStatus
);

/* Delete appointment */
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("Admin"),
  deleteAppointment
);

export default router;
