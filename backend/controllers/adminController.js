const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require('../models/adminModel')
const Doctor = require('../models/doctor.model')
const Department = require('../models/department.model')

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };
//testing

//Get admin
const getAdmin = asyncHandler(async (req, res) => {
    const {_id, name, email} = await Admin.findById(req.admin.id)
    res.status(201).json({
        id:_id,
        name,
        email
    })
})


//Register Admin
const registerAdmin = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all fields")


    }

    //Check if admin exists
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error("Admin already exists")
    }

    //Create Admin
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })

    if(admin){
        res.status(200).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid admin data")
    }

})
//Login Admin
const loginAdmin = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const admin = await Admin.findOne({email})

    if (admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid admin data")
    }
})

//Logout Admin
const logoutAdmin = asyncHandler(async (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error while logging out" });
      }
})
//Update Admin
//Delete Admin

//Create Department
const createDepartment = asyncHandler(async (req, res) => {
    const admin = req.admin.id
    const name = req.body.name
    
    const newDepartment = new Department({
        admin,
        name
    })

    //Check if department exists
    const departmentExists = await Department.findOne({name})
    if(departmentExists){
        res.status(400)
        throw new Error("Department already exists")
    }

    newDepartment.save()
                    .then((department) => res.json("New Department Added"))
                    .catch((err) => res.status(400).json("Error: " + err))
})
//Delete Department

//Get Doctor
const getDoctor = asyncHandler(async (req, res) => {
    Doctor.find({admin:req.admin.id})
        .then((doctor) => res.json(doctor))
        .catch((err) => res.status(400).json("Error: " + err))
})
//Register doctor
const registerDoctor = asyncHandler(async (req,res) => {
    const admin = req.admin.id
    const {name, email, password, departmentName} = req.body

    if (!name || !email || !password || !departmentName){
        res.status(400)
        throw new Error("Please fill all fields")
    }

    //Check if doctor exists
    const doctorExists = await Doctor.findOne({email})
    if(doctorExists){
        res.status(400)
        throw new Error("Doctor already exists")
    }

    const department = await Department.findOne({ name: departmentName });
    if (!department) {
      res.status(400);
      throw new Error("Department not found");
    }

    //Create Doctor
    const hashedPassword = await bcrypt.hash(password, 10)

    const doctor = await Doctor.create({
        admin,
        name,
        email,
        password: hashedPassword,
        dept_id: department._id
    })

    if(doctor){
        res.status(200).json({
            _id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            department: department.name,
            token: generateToken(doctor._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid doctor data")
    }

})
//Update doctor
//Delete doctor

//Get Staff
//Register Staff
//Update Staff
//Delete Staff



module.exports = {getAdmin, registerAdmin, loginAdmin, logoutAdmin, createDepartment ,getDoctor, registerDoctor}