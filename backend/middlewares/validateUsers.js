const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersService = require('../services/users');

const validator = (email) => {
  if (email.includes('@') && email.includes('.com')) {
    return true;
  }
  return false;
};

const errorMessage = (message) => ({
  message,
});

const schemaCreate = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string(),
});

const verifyToCreateAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.TODO_SECRET;

  const verify = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return { status: 401, message: 'missing auth token' };
    }
    if (decoded.data.role !== 'admin') {
      return { status: 403, message: 'Only admins can register new admins' };
    }
    
    return decoded;
  });

  if (verify.err) return res.status(verify.status).json({ message: verify.message });

  next();
};

const verifyCreateUser = async (req, res, next) => {
  const { error } = schemaCreate.validate(req.body);
  const { name, email } = req.body;

  if (error) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

  if (!validator(email)) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

  const users = await usersService.getAllUsers();
  const filterByEmail = users.filter((user) => user.email === email);
  const filterByName = users.filter((user) => user.name === name);

  if (filterByEmail.length > 0) {
    return res.status(409).json(errorMessage('Email already registered'));
  }

  if (filterByName.length > 0) {
    return res.status(409).json(errorMessage('Name already registered'));
  }

  next();
};

const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json(errorMessage('All fields must be filled'));
  }

  next();
};

module.exports = { verifyCreateUser, verifyLogin, verifyToCreateAdmin };