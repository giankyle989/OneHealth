const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment.model");
const Patient = require('../models/patientModel')
const { DateTime } = require('luxon');

const getAllTodaysAppointment = asyncHandler(async (req, res) => {
  // Get today's date in Singapore time zone
  const todayInSingapore = DateTime.now().setZone('Asia/Singapore');
  const startOfToday = todayInSingapore.startOf('day');
  const endOfToday = todayInSingapore.endOf('day');

  Appointment.find({
    appointmentDateTime: {
      $gte: startOfToday.toJSDate(),
      $lt: endOfToday.toJSDate()
    }
  }).populate('doctorId')
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});
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
const getAppointmentById = asyncHandler(async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId; // Assuming the ID is in the request parameters
    const appointment = await Appointment.findById(appointmentId).populate('doctorId').populate('prescription').populate('patientId')


    if (!appointment) {
      return res.status(404).json("Appointment not found");
    }

    res.json(appointment);
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
  const appointmentId = req.params.id;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Check if the requested status is in the allowed states
    const allowedStatus = ["Reception", "Assessment", "Testing", "Consultation", "Done"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update the appointment status
    appointment.appt_status = status;

    // Save the updated appointment
    await appointment.save();

    return res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addDiagnosis = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const { diagnosis } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment status
    appointment.diagnosis = diagnosis;

    // Save the updated appointment
    await appointment.save();

    return res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = {
  getAllTodaysAppointment,
  getAppointment,
  createAppointment,
  updateAppointment,
  doctorGetAppointments,
  createAppointmentByReceptionist,
  addDiagnosis,
  getAppointmentById
};
