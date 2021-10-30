const todoModels = require('../models/todo');

const createTodo = (name, todo) => {
  const result = todoModels.createTodo(name, todo);
  return result;
};

const getAllTodo = () => {
  const result = todoModels.getAllTodo();
  return result;
};

const getTodosByName = (name) => {
  const result = todoModels.getTodosByName(name);
  return result;
};

module.exports = { createTodo, getAllTodo, getTodosByName };