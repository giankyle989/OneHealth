const router = require("express").Router();
const { getAllAppointment } = require("../controllers/appointmentController");
const {loginNurse, logoutNurse} = require('../controllers/nurseController')

//Get patients for the day.

router.post('/login', loginNurse)
router.post('/logout', logoutNurse)


router.get('/get', getAllAppointment)

module.exports = router;