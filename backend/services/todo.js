const todoModels = require('../models/todo');

const createTodo = (name, todo) => {
  const result = todoModels.createTodo(name, todo);
  return result;
};

module.exports = { createTodo };