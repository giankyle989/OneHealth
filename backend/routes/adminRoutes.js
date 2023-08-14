const router = require("express").Router();
const {registerAdmin, loginAdmin, logoutAdmin, getAdmin} = require('../controllers/adminController');
const {protect} = require('../middlewares/authMiddleware');
const AdminModel = require("../models/adminModel");


router.get('/', protect(AdminModel), getAdmin)
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)





module.exports = router;