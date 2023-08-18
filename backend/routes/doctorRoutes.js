const router = require("express").Router();
const {  updateAppointment, doctorGetAppointments } = require("../controllers/appointmentController");
const { loginDoctor, logoutDoctor, getDoctorByDepartment, } = require("../controllers/doctorController");
const {protect} = require('../middlewares/authMiddleware');
const Doctor = require("../models/doctor.model");


router.get('/department/:id', getDoctorByDepartment)

router.post('/login', loginDoctor)
router.post('/logout', logoutDoctor)

router.get('/appointment/get', protect(Doctor), doctorGetAppointments )
router.put('/appointment/:id', updateAppointment )





module.exports = router;