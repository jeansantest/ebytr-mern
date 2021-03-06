// const jwt = require('jsonwebtoken');
const todoServices = require('../services/todo');

const createTodo = async (req, res) => {
  const { name } = req.data;
  const { todo } = req.body;
  
  const result = await todoServices.createTodo(name, todo);
  res.status(201).json(result);
};

const getAllTodo = async (_req, res) => {
  const result = await todoServices.getAllTodo();
  res.status(200).json({ todos: result });
};

const getTodosByName = async (req, res) => {
  const { name } = req.params;
  const result = await todoServices.getTodosByName(name);
  res.status(200).json({ todos: result });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const result = await todoServices.updateTodo(id, todo);
  result.todo = todo;
  res.status(200).json(result);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await todoServices.deleteTodo(id);

  res.status(204).json();
};

const updateTodoStatus = async (req, res) => {
  const { id, status } = req.params;
  const result = await todoServices.updateTodoStatus(id, status);
  result.status = status;
  res.status(200).json(result);
};

module.exports = { 
  createTodo, getTodosByName, getAllTodo, updateTodo, deleteTodo, updateTodoStatus };