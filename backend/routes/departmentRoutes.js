const router = require("express").Router();
const { getDepartment, createDepartment, deleteDepartment } = require("../controllers/departmentController");
const {protect} = require('../middlewares/authMiddleware');
const AdminModel = require("../models/adminModel");



router.get('/get', protect(AdminModel), getDepartment)
router.post('/create', protect(AdminModel), createDepartment)
router.delete('/:id', protect(AdminModel), deleteDepartment)





module.exports = router;