const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment.model");

const getAppointment = asyncHandler(async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id });

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

const createAppointment = asyncHandler(async (req,res) => {
    const patientId = (req.user.id)
    const {doctorId, appointmentDateTime} = req.body
  
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentDateTime
    });
  
    newAppointment
      .save()
      .then((appointment) => res.json("Created New Appointment"))
      .catch((err) => res.status(400).json("Error :" + err));
})

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



module.exports = {getAppointment, createAppointment, updateAppointment, doctorGetAppointments}