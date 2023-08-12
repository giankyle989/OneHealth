const router = require("express").Router();
const {registerAdmin, loginAdmin, logoutAdmin, registerDoctor, getAdmin, getDoctor, createDepartment} = require('../controllers/adminController')
const {protect} = require('../middlewares/authMiddleware')

router.get('/', protect ,getAdmin)
router.post('/create', protect, registerAdmin)
router.post('/login', protect, loginAdmin)
router.post('/logout', protect, logoutAdmin)

router.post('/create/department', protect, createDepartment)

router.get('/get/doctor', protect ,getDoctor)
router.post('/create/doctor', protect, registerDoctor)

module.exports = router;