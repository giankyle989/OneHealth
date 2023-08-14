const router = require("express").Router();
const { getDoctor, registerDoctor, loginDoctor, logoutDoctor, deleteDoctor, updateDoctor } = require("../controllers/doctorController");
const {protect} = require('../middlewares/authMiddleware');
const AdminModel = require("../models/adminModel");


router.get("/get", protect(AdminModel), getDoctor);
router.post("/create", protect(AdminModel), registerDoctor);
router.put('/:id', protect(AdminModel), updateDoctor)
router.delete('/:id', protect(AdminModel), deleteDoctor)
router.post('/login', loginDoctor)
router.post('/logout', logoutDoctor)




module.exports = router;