import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

// CREATE APPOINTMENT 
export const createAppointmentService = async (data, patientId) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    governmentId,
    dob,
    gender,
    appointmentDate,
    department,
    doctorName,
    hasVisited,
    address,
  } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !governmentId ||
    !dob ||
    !gender ||
    !appointmentDate ||
    !department ||
    !doctorName ||
    !address
  ) {
    throw new ErrorHandler("Please fill all required fields", 400);
  }

  /* Find doctor */




const doctors = await User.find({
  role: "Doctor",
  doctorDepartment: department,
  $expr: {
    $regexMatch: {
      input: { $concat: ["$firstName", " ", "$lastName"] },
      regex: `^${doctorName}$`,
      options: "i",
    },
  },
});


  if (doctors.length === 0) {
    throw new ErrorHandler("Doctor not found", 404);
  }

  if (doctors.length > 1) {
    throw new ErrorHandler(
      "Doctors conflict! Please contact hospital support",
      400
    );
  }

  const doctor = doctors[0];

  return await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    governmentId: governmentId,
    dob,
    gender,
    appointmentDate,
    department,
    doctorName,
    hasVisited,
    address,
    doctorId: doctor._id,
    patientId,
  });
};

// GET ALL APPOINTMENTS 
export const getAllAppointmentsService = async () => {
  return await Appointment.find().sort({ createdAt: -1 });
};

// UPDATE APPOINTMENT 
export const updateAppointmentStatusService = async (id, updateData) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ErrorHandler("Appointment not found", 404);
  }

  return await Appointment.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// DELETE APPOINTMENT 
export const deleteAppointmentService = async (id) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ErrorHandler("Appointment not found", 404);
  }

  await appointment.deleteOne();
};
