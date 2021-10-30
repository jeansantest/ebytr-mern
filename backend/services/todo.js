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

const updateTodo = async (id, todo) => {
  const result = await todoModels.updateTodo(id, todo);
  return result;
};

const deleteTodo = async (id) => {
  const result = await todoModels.deleteTodo(id);
  return result;
};

const getTodoById = async (id) => {
  const result = await todoModels.getTodoById(id);
  return result;
};

module.exports = { createTodo, getAllTodo, getTodosByName, updateTodo, deleteTodo, getTodoById };