const todoServices = require('../services/todo');

const createTodo = async (req, res) => {
  const { name, todo } = req.body;
  const results = await todoServices.createTodo(name, todo);
  res.status(201).json(results);
};

module.exports = { createTodo };