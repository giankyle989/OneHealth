const router = require("express").Router();
const { loginReceptionist, logoutReceptionist } = require('../controllers/receptionistController');
const ReceptionistModel = require("../models/receptionistModel");
const {protect} = require('../middlewares/authMiddleware');
const {getDoctorByReceptionist} = require('../controllers/doctorController')
const {createPatient, searchPatient} = require('../controllers/patientController');
const { createAppointmentByReceptionist, getAllTodaysAppointment } = require("../controllers/appointmentController");


router.post('/login', loginReceptionist)
router.post('/logout', logoutReceptionist)

//For Doctor
router.get("/doctor/get", protect(ReceptionistModel), getDoctorByReceptionist);

//For Patient
router.post('/patient/register', createPatient)
router.get('/patient/search', searchPatient)

//For Appointment
router.post('/appointment/create' ,createAppointmentByReceptionist)
router.get('/appointment/get', getAllTodaysAppointment)

module.exports = router;