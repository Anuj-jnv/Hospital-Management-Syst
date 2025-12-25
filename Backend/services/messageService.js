import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/error.js";

// SEND MESSAGE 
export const sendMessageService = async ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => {
  if (!firstName || !lastName || !email || !phone || !message) {
    throw new ErrorHandler("Please fill all required fields", 400);
  }

  return await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
};

// GET ALL MESSAGES 
export const getAllMessagesService = async () => {
  return await Message.find().sort({ createdAt: -1 });
};
