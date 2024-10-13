const express = require('express');
const {registerUser,loginUser} = require('../controllers/userController');
const { validateRegisterUser, validateLoginUser } = require('../middlewares/validateUser'); 

const router = express.Router();

router.post('/register',validateRegisterUser, registerUser);
router.post('/login',validateLoginUser, loginUser);

module.exports = router;
