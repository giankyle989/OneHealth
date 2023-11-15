const { getAppointment, createAppointment, getAppointmentById } = require("../controllers/appointmentController");
const { getPatient, registerPatient, loginPatient, logoutPatient, updatePatient } = require("../controllers/patientController");
const { protect } = require("../middlewares/authMiddleware");
const PatientModel = require("../models/patientModel");

const router = require("express").Router();

router.get('/get', protect(PatientModel),getPatient)
router.post('/register', registerPatient)
router.put('/:id', protect(PatientModel),updatePatient)
router.post('/login', loginPatient)
router.post('/logout', logoutPatient)


router.get('/appointment/get',protect(PatientModel) ,getAppointment )
router.get('/appointment/:appointmentId', getAppointmentById )
router.post('/appointment/create', protect(PatientModel),createAppointment )

module.exports = router;