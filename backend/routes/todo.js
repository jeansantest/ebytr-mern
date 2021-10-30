const express = require('express');
const todoControllers = require('../controllers/todo');
const todoValidate = require('../middlewares/validateTodo');

const router = express.Router();

router.get('/', todoControllers.getAllTodo);

router.get('/:name', todoValidate.verifyTodoNameParam, todoControllers.getTodosByName);

router.post('/', todoValidate.verifyTodoCreate, todoControllers.createTodo);

router.put('/:id', 
  todoValidate.verifyTodoNameBody, todoValidate.verifyTodoId, todoControllers.updateTodo);

router.delete('/:id', todoValidate.verifyTodoId, todoControllers.deleteTodo);

module.exports = router;