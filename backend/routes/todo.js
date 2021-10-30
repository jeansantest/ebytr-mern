const express = require('express');
const todoControllers = require('../controllers/todo');

const router = express.Router();

router.post('/', todoControllers.createTodo);

module.exports = router;