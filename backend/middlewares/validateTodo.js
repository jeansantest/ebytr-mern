const Joi = require('joi');
const { ObjectId } = require('mongodb');
const todoServices = require('../services/todo');

const errorMessage = (message) => ({
  message,
});

const schemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  todo: Joi.string().min(4).required(),
});

const verifyTodoCreate = async (req, res, next) => {
  const { name, todo } = req.body;
  const { error } = schemaCreate.validate(req.body);
  const getByName = await todoServices.getTodosByName(name);
  const filteredByTodo = getByName.filter((e) => e.todo === todo);

  if (error) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

  if (filteredByTodo.length > 0) return res.status(400).json(errorMessage('Todo already exists'));

  next();
};

const verifyTodoId = async (req, res, next) => {
  const { id } = req.params;
  const getById = await todoServices.getTodoById(id);

  if (!ObjectId.isValid(id)) return res.status(400).json(errorMessage('Invalid id'));

  if (!getById) return res.status(404).json(errorMessage('Todo not found'));

  next();
};

const verifyTodoNameParam = async (req, res, next) => {
  const { name } = req.params;

  if (!name || name.length < 3) return res.status(400).json(errorMessage('Invalid name'));

  next();
};

const verifyTodoNameBody = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length < 3) return res.status(400).json(errorMessage('Invalid name'));

  next();
};

module.exports = { verifyTodoCreate, verifyTodoId, verifyTodoNameParam, verifyTodoNameBody };