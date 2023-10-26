const router = require("express").Router();
const {  updateAppointment, doctorGetAppointments } = require("../controllers/appointmentController");
const { createAvailability, getAvailability, deleteAvailability } = require("../controllers/availabilityController");
const { loginDoctor, logoutDoctor, getDoctorByDepartment, } = require("../controllers/doctorController");
const {protect} = require('../middlewares/authMiddleware');
const Doctor = require("../models/doctor.model");


router.get('/department/:id', getDoctorByDepartment)

router.post('/login', loginDoctor)
router.post('/logout', logoutDoctor)

router.get('/appointment/get', protect(Doctor), doctorGetAppointments )
router.put('/appointment/:id', updateAppointment )

router.get('/availability/:id',getAvailability)
router.post('/availability/create', protect(Doctor),createAvailability)
router.delete('/availability/:id', protect(Doctor),deleteAvailability)




module.exports = router;