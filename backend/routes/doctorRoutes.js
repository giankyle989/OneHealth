const router = require("express").Router();
const {  updateAppointment, doctorGetAppointments } = require("../controllers/appointmentController");
const { loginDoctor, logoutDoctor, } = require("../controllers/doctorController");
const {protect} = require('../middlewares/authMiddleware');
const DoctorModel = require("../models/doctor.model");



router.post('/login', loginDoctor)
router.post('/logout', logoutDoctor)

router.get('/appointment/get', protect(DoctorModel), doctorGetAppointments )
router.put('/appointment/:id', updateAppointment )





module.exports = router;