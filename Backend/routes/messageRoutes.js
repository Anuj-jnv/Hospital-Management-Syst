import express from "express";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/messageController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* Patient sends message */
router.post("/send", isAuthenticated, sendMessage);

/* Admin views messages */
router.get(
  "/admin",
  isAuthenticated,
  authorizeRoles("Admin"),
  getAllMessages
);

export default router;
