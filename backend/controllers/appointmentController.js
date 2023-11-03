const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment.model");
const Patient = require('../models/patientModel')

const getAppointment = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({patientId:req.user.id}).populate({
      path: "doctorId",
      select: "firstName lastName  dept_id ",
      populate: {
        path: "dept_id",
        select: "name",
      },
    });
    if (appointments.length === 0) {
      return res.status(200).json("No Appointments");
    }
    res.json(appointments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

const doctorGetAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id });

    if (appointments.length === 0) {
      return res.status(200).json("No Appointments");
    }

    res.json(appointments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

const createAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user.id;
  const { patientFirstName, patientLastName, email, mobileNumber, doctorId, appointmentDateTime, reason } = req.body;

  if (
    !patientFirstName ||
    !patientLastName ||
    !doctorId ||
    !appointmentDateTime ||
    !reason
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const newAppointment = new Appointment({
    patientFirstName,
    patientLastName,
    email,
    mobileNumber,
    patientId,
    doctorId,
    appointmentDateTime,
    reason
  });


  newAppointment
    .save()
    .then((appointment) => res.json("Created New Appointment"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//Need patientId validation and error handling
const createAppointmentByReceptionist = asyncHandler(async (req, res) => {
  const { patientId, patientFirstName, patientLastName, email, mobileNumber, doctorId, appointmentDateTime, reason } = req.body;

  if (
    !patientId ||
    !patientFirstName ||
    !patientLastName ||
    !doctorId ||
    !appointmentDateTime ||
    !reason
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }


  const newAppointment = new Appointment({
    patientFirstName,
    patientLastName,
    email,
    mobileNumber,
    patientId,
    doctorId,
    appointmentDateTime,
    reason
  });

  newAppointment
    .save()
    .then((appointment) => res.json("Created New Appointment"))
    .catch((err) => res.status(400).json("Error :" + err));
});

const updateAppointment = asyncHandler(async (req, res) => {
  try {
    const { appointmentId, newStatus } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { appt_status: newStatus },
      { new: true } // Return the updated appointment
    );

    if (!updatedAppointment) {
      return res.status(404).json("Appointment not found");
    }

    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = {
  getAppointment,
  createAppointment,
  updateAppointment,
  doctorGetAppointments,
  createAppointmentByReceptionist
};
