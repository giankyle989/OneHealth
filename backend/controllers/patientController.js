const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Patient = require('../models/patientModel')

const { generateToken } = require("../middlewares/generateToken");

//Get Patient
const getPatient = asyncHandler(async (req, res) => {
    Patient.find({})
    .then((patient) => res.json(patient))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Register Admin
const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //Check if patient exists
  const patientExists = await Patient.findOne({ email });
  if (patientExists) {
    res.status(400);
    throw new Error("Patient already exists");
  }

  //Create Admin
  const hashedPassword = await bcrypt.hash(password, 10);

  const patient = await Patient.create({
    name,
    email,
    password: hashedPassword,
  });

  if (patient) {
    res.status(200).json({
      _id: patient.id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid patient data");
  }

});

//Login Patient
const loginPatient = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });

  if (patient && (await bcrypt.compare(password, patient.password))) {
    res.json({
      _id: patient.id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid patient data");
  }
});

//Logout Admin
const logoutPatient = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while logging out" });
  }
});
//Update Admin

module.exports = {getPatient, registerPatient, loginPatient, logoutPatient};
