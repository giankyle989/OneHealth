const router = require("express").Router();
const {loginNurse, logoutNurse} = require('../controllers/nurseController')

//Get patients for the day.

router.post('/login', loginNurse)
router.post('/logout', logoutNurse)


module.exports = router;