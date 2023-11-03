const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");

const { generateToken } = require("../middlewares/generateToken");
const AddressModel = require("../models/addressModel");

//Get All Patient
const getPatient = asyncHandler(async (req, res) => {
  Patient.findById(req.user.id)
    .then((patient) => res.json(patient))
    .catch((err) => res.status(400).json("Error: " + err));
});

const searchPatient = asyncHandler(async (req, res) =>{
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameter

    // Perform the search query on your Patient model using case-insensitive regex
    const patients = await Patient.find({
      $or: [
        { firstName: new RegExp(searchTerm, "i") }, // Case-insensitive search by first name
        { lastName: new RegExp(searchTerm, "i") },  // Case-insensitive search by last name
      ],
    });

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
})

//Register Patient
const registerPatient = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    sex,
    birthday,
    mobileNumber,
    landline,
    addressLine1,
    addressLine2,
    barangay,
    city,
    province,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !password ||
    !sex ||
    !birthday ||
    !addressLine1 ||
    !barangay ||
    !city ||
    !province
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //Check if patient exists
  const patientExists = await Patient.findOne({ $or: [ { email }, { mobileNumber } ] });
  if (patientExists) {
    res.status(400);
    throw new Error("Patient already exists");
  }

  //Create Patient
  const hashedPassword = await bcrypt.hash(password, 10);

  const address = await AddressModel.create({
    addressLine1,
    addressLine2,
    barangay,
    city,
    province
  })

  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    sex,
    birthday,
    mobileNumber,
    landline,
    addressId: address._id
  });

  res.status(201).json(patient);
});

//Create Patient account by receptionist
const createPatient = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !password
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //Check if patient exists
  const patientExists = await Patient.findOne({ $or: [ { email }, { mobileNumber } ] });
  if (patientExists) {
    res.status(400);
    throw new Error("Patient already exists");
  }

  //Create Patient
  const hashedPassword = await bcrypt.hash(password, 10);


  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    mobileNumber,
  });

  res.status(201).json(patient);
});

//Login Patient
const loginPatient = asyncHandler(async (req, res) => {
  const { email, mobileNumber, password } = req.body;

  const patient = await Patient.findOne({ $or: [ { email }, { mobileNumber } ] });

  if (patient && (await bcrypt.compare(password, patient.password))) {
    res.json({
      _id: patient.id,
      name: patient.firstName,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid patient data");
  }
});

//Logout Patient
const logoutPatient = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while logging out" });
  }
});
//Update Patient

module.exports = { getPatient, registerPatient, loginPatient, logoutPatient, createPatient, searchPatient };
