const express = require('express');
const usersControllers = require('../controllers/users');
const usersValidate = require('../middlewares/validateUsers');

const router = express.Router();

router.post('/signup', usersValidate.verifyCreateUser, usersControllers.createUser);

router.post('/signup/admin', 
  usersValidate.verifyToCreateAdmin, usersValidate.verifyCreateUser, usersControllers.createUser);

router.post('/login', usersValidate.verifyLogin, usersControllers.loginUser);

module.exports = router;