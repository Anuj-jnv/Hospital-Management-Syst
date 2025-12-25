import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {
  sendMessageService,
  getAllMessagesService,
} from "../services/messageService.js";

// SEND MESSAGE 
export const sendMessage = catchAsyncErrors(async (req, res) => {
  await sendMessageService(req.body);

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});

// GET ALL MESSAGES 
export const getAllMessages = catchAsyncErrors(async (req, res) => {
  const messages = await getAllMessagesService();

  res.status(200).json({
    success: true,
    messages,
  });
});
