const asyncHandler = require("express-async-handler");
const Availability = require('../models/availabilityModel');
const Doctor = require('../models/doctor.model')
const moment = require('moment-timezone'); // Import moment-timezone

const getAvailability = asyncHandler(async (req, res) => {
  
  Availability.find({ doctorId: req.user.id })
    .then(availabilities => {
      res.json(availabilities);
    })
    .catch(error => {
      res.status(500).json("Error: " + error);
    });


});
const getAllAvailability = asyncHandler(async (req, res) => {
  
  Availability.find({ })
    .then(availabilities => {
      res.json(availabilities);
    })
    .catch(error => {
      res.status(500).json("Error: " + error);
    });


});

const getAvailabilityByDoctorId = asyncHandler(async (req, res) => {
  const doctorId = req.params.id; // Assuming the doctor's ID is in the route parameters

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const availabilities = await Availability.find({ doctorId });
    res.json(availabilities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctor's availability", details: error.message });
  }
});

const createAvailability = asyncHandler(async (req, res) => {
  const doctorId = req.user.id;
  const { title, start, end } = req.body;

  if ( !title || !start || !end) {
    res.status(400);
    throw new Error("Please fill all fields");
  }


const newAvailability = new Availability({
    title,
    start,
    end,
    doctorId
  });
  

newAvailability
  .save()
  .then((availability) => res.json(newAvailability))
  .catch((err) => res.status(400).json("Error: " + err));
});


const deleteAvailability = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.user.id);

  if (!doctor) {
    return res.status(401).json({ error: "Doctor not found" });
  }

  Availability.findById(req.params.id)
    .then((availability) => {
      if (!availability) {
        return res.status(404).json({ error: "Availability not found" });
      }
      if (availability.doctorId.toString() !== doctor.id) {
        return res.status(401).json({ error: "User not authorized" });
      }

      // If the user is authorized, proceed with the deletion
      Availability.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.json({ message: "Availability was deleted" });
        })
        .catch((err) => res.status(400).json({ error: "Error: " + err }));
    })
    .catch((err) => res.status(400).json({ error: "Error: " + err }));
});


module.exports = {getAvailability, createAvailability, deleteAvailability, getAvailabilityByDoctorId, getAllAvailability };
