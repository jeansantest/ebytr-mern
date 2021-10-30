const express = require('express');
const usersControllers = require('../controllers/users');
const usersValidate = require('../middlewares/validateUsers');

const router = express.Router();

router.post('/signup', usersValidate.verifyCreateUser, usersControllers.createUser);

module.exports = router;