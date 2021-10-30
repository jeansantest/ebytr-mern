const express = require('express');
const todoControllers = require('../controllers/todo');

const router = express.Router();

router.get('/', todoControllers.getAllTodo);

router.get('/:name', todoControllers.getTodosByName);

router.post('/', todoControllers.createTodo);

router.put('/:id', todoControllers.updateTodo);

module.exports = router;