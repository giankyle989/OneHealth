const router = require("express").Router();
const {registerAdmin, loginAdmin, logoutAdmin, getAdmin} = require('../controllers/adminController');
const { getDepartment, createDepartment, deleteDepartment } = require("../controllers/departmentController");
const { getDoctor, registerDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController");
const {protect} = require('../middlewares/authMiddleware');
const AdminModel = require("../models/adminModel");




//For admin
router.get('/', protect(AdminModel), getAdmin)
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)

//For department
router.get('/get', protect(AdminModel), getDepartment)
router.post('/create', protect(AdminModel), createDepartment)
router.delete('/:id', protect(AdminModel), deleteDepartment)

//For Doctor
router.get("/doctor/get", protect(AdminModel), getDoctor);
router.post("/doctor/create", protect(AdminModel), registerDoctor);
router.put('/doctor/:id', protect(AdminModel), updateDoctor)
router.delete('/doctor/:id', protect(AdminModel), deleteDoctor)




module.exports = router;