const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const todoServices = require('../services/todo');

const errorMessage = (message) => ({
  message,
});

const schemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  todo: Joi.string().min(4).required(),
});

const secret = process.env.TODO_SECRET;
const verifyToken = (req, token) => jwt.verify(token, secret, (err, decoded) => {
  if (err) return { status: 401, message: 'missing auth token' };
  req.data = decoded.data;
  return decoded.data;
});

const verifyTodoCreate = async (req, res, next) => {
  const token = req.headers.authorization;
  
  const { todo } = req.body;
  const verify = verifyToken(req, token);

  if (verify.message) {
    return res.status(verify.status).json({ message: verify.message });
  }

  const { error } = schemaCreate.validate({ name: req.data.name, todo });
  const getByName = await todoServices.getTodosByName(req.data.name);
  const filteredByTodo = getByName.filter((e) => e.todo === todo);

  if (error) return res.status(400).json(errorMessage('Invalid entries. Try again.'));

  if (filteredByTodo.length > 0) return res.status(400).json(errorMessage('Todo already exists'));

  next();
};

const verifyToAdminUpdate = (data, getById) => {
  const { role, name } = data;
  if (role !== 'admin' && name !== getById.name) {
    return { status: 401, message: 'this todo is not yours' };
  }
  return false;
};

const verifyTodoId = async (req, res, next) => {
  const token = req.headers.authorization;
  const verify = verifyToken(req, token);
  const { id } = req.params;

  if (verify.message) {
    return res.status(verify.status).json({ message: verify.message });
  }
  
  if (!ObjectId.isValid(id)) return res.status(400).json(errorMessage('Invalid id'));
  
  const getById = await todoServices.getTodoById(id);
  const userUpdatesOnlyTheirOwnTodo = verifyToAdminUpdate(req.data, getById);
  
  if (userUpdatesOnlyTheirOwnTodo) { 
    return res.status(userUpdatesOnlyTheirOwnTodo.status).json({ 
      message: userUpdatesOnlyTheirOwnTodo.message, 
    });
  }

  if (!getById) return res.status(404).json(errorMessage('Todo not found'));

  next();
};

const verifyTodoNameParam = async (req, res, next) => {
  const { name } = req.params;

  if (!name || name.length < 3) return res.status(400).json(errorMessage('Invalid name'));

  next();
};

const verifyTodoNameData = async (req, res, next) => {
  const token = req.headers.authorization;
  const verify = verifyToken(req, token);

  if (verify.message) {
    return res.status(verify.status).json({ message: verify.message });
  }

  const { name } = req.data;

  if (!name || name.length < 3) return res.status(400).json(errorMessage('Invalid name'));

  next();
};

const verifyTodoStatus = async (req, res, next) => {
  const { status } = req.params;
  const statusThatCanBeUsed = ['pendente', 'andamento', 'pronto'];

  if (!statusThatCanBeUsed.some((e) => e === status)) {
    return res.status(405).json({ message: 'this status cant be used' });
  }

  next();
};

module.exports = { 
  verifyTodoCreate, verifyTodoId, verifyTodoNameParam, verifyTodoNameData, verifyTodoStatus };