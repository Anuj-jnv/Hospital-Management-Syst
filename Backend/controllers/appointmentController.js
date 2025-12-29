import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {
  createAppointmentService,
  getAllAppointmentsService,
  updateAppointmentStatusService,
  deleteAppointmentService,
} from "../services/appointmentService.js";

// CREATE APPOINTMENT 
export const postAppointment = catchAsyncErrors(async (req, res) => {
  //console.log(req.body);
  const appointment = await createAppointmentService(
    req.body,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Appointment sent successfully",
    appointment,
  });
});

// GET ALL APPOINTMENTS 
export const getAllAppointments = catchAsyncErrors(async (req, res) => {
  const appointments = await getAllAppointmentsService();

  res.status(200).json({
    success: true,
    appointments,
  });
});

// UPDATE APPOINTMENT 
export const updateAppointmentStatus = catchAsyncErrors(async (req, res) => {
  await updateAppointmentStatusService(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Appointment status updated",
  });
});

// DELETE APPOINTMENT 
export const deleteAppointment = catchAsyncErrors(async (req, res) => {
  await deleteAppointmentService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Appointment deleted",
  });
});
