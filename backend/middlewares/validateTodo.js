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
  const { error } = schemaCreate.validate(req.body);

  if (error) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

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