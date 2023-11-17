const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const LabResult = require('../models/labResultModel');
const Appointment = require('../models/appointment.model');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage(); // You can adjust storage settings based on your needs
const upload = multer({ storage: storage });

const createLabResult = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;

  // Upload file to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.buffer, {
    folder: "lab-results", // You can customize the folder structure
    resource_type: "auto", // Automatically determine the resource type
  });

  // Create LabResult entry in the database
  const labResult = new LabResult({
    appointmentId,
    filename: req.body.filename,
    url: result.secure_url,
  });

  await labResult.save();

  // Optionally, update the Appointment model with the lab result information
  await Appointment.findByIdAndUpdate(
    appointmentId,
    { $set: { labResult: labResult._id } },
    { new: true }
  );

  res.status(201).json(labResult);
});

module.exports = {
  createLabResult
};
