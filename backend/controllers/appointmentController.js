const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment.model");
const { DateTime } = require("luxon");
const nodemailer = require("nodemailer");

//Nurse get appointments
const getAllTodaysAppointment = asyncHandler(async (req, res) => {
  // Get tomorrow's date in Singapore time zone
  const tomorrowInSingapore = DateTime.now().setZone("Asia/Singapore");
  const startOfTomorrow = tomorrowInSingapore.startOf("day");
  const endOfTomorrow = tomorrowInSingapore.endOf("day");

  Appointment.find({
    appointmentDateTime: {
      $gte: startOfTomorrow.toJSDate(),
      $lt: endOfTomorrow.toJSDate(),
    },
  })
    .populate({
      path: "doctorId",
      select: "firstName lastName dept_id",
      populate: {
        path: "dept_id",
        select: "name",
      },
    })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

const getAllAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("patientId")
      .populate("doctorId")
      .populate("diagnosis");
    if (appointments.length === 0) {
      return res.status(200).json("No Appointments");
    }
    res.json(appointments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Patient get appointments
const getAppointment = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .sort({ appointmentDateTime: -1 }) //Sort appointment
      .populate({
        path: "doctorId",
        select: "firstName lastName  dept_id ",
        populate: {
          path: "dept_id",
          select: "name",
        },
      })
      .populate("diagnosis");
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
    const appointment = await Appointment.findById(appointmentId)
      .populate("doctorId")
      .populate("prescription")
      .populate("patientId");

    if (!appointment) {
      return res.status(404).json("Appointment not found");
    }

    res.json(appointment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Doctor get appointments
const doctorGetAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId")
      .populate("diagnosis");

    if (appointments.length === 0) {
      return res.status(200).json("No Appointments");
    }

    res.json(appointments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

const doctorGetAppointmentsWithPatient = asyncHandler(async (req, res) => {
  try {
    const doctorId = req.user.id;
    const patientId = req.params.patientId; // Assuming the patientId is passed in the URL params

    const appointments = await Appointment.find({
      doctorId,
      patientId,
    }).populate("patientId");

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
  const {
    patientFirstName,
    patientLastName,
    email,
    mobileNumber,
    doctorId,
    appointmentDateTime,
    reason,
  } = req.body;

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

  // Convert appointmentDateTime to a Luxon DateTime object
  let appointmentDate = DateTime.fromISO(appointmentDateTime, {
    zone: "Asia/Singapore",
  });

  const formattedAppointmentDate =
    appointmentDate.toFormat("MMMM dd, yyyy - t");

  const newAppointment = new Appointment({
    patientFirstName,
    patientLastName,
    email,
    mobileNumber,
    patientId,
    doctorId,
    appointmentDateTime: appointmentDate.toJSDate(),
    reason,
  });

  newAppointment
    .save()
    .then((appointment) => {
      // Sending confirmation email after successfully booking the appointment
      sendAppointmentConfirmationEmail(email, formattedAppointmentDate);
      res.json("Created New Appointment");
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

//Need patientId validation and error handling
const createAppointmentByReceptionist = asyncHandler(async (req, res) => {
  const {
    patientId,
    patientFirstName,
    patientLastName,
    email,
    mobileNumber,
    doctorId,
    appointmentDateTime,
    reason,
  } = req.body;

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
    reason,
  });

  newAppointment
    .save()
    .then((appointment) => {
      sendAppointmentConfirmationEmail(email, appointmentDate);
      res.json("Created New Appointment");
    })
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
    const allowedStatus = [
      "Reception",
      "Assessment",
      "Testing",
      "Consultation",
      "Done",
    ];
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
  const diagnosisId = req.params.diagnosisId;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment status
    appointment.diagnosis = diagnosisId;

    // Save the updated appointment
    await appointment.save();

    return res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getAllTodaysAppointment,
  getAppointment,
  createAppointment,
  updateAppointment,
  doctorGetAppointments,
  createAppointmentByReceptionist,
  addDiagnosis,
  getAppointmentById,
  doctorGetAppointmentsWithPatient,
  getAllAppointments
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "onehealth.cainta@gmail.com",
    pass: "iwpn cghe zpua sjyz",
  },
});

async function sendAppointmentConfirmationEmail(
  email,
  formattedAppointmentDate
) {
  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"One Health Cainta" <onehealth.cainta@gmail.com>',
    to: email,
    subject: "Appointment Confirmation",
    text: `Dear Patient,\n\nYour appointment has been booked for the following date and time: ${formattedAppointmentDate}.\n\nThank you for choosing our clinic.\n\nSincerely,\nOne Health Cainta Team`,
    html: `<p>Dear Patient,</p><p>Your appointment has been booked for the following date and time: ${formattedAppointmentDate}.</p><p>Thank you for choosing our clinic.</p><p>Sincerely,<br>One Health Cainta Team</p>`,
  });

  console.log("Message sent: %s", info.messageId);
}
