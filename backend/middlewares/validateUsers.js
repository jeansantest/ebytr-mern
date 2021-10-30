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

const verifyToCreateAdmin = (req, res) => {
  const token = req.headers.authorization;
  const secret = process.env.TODO_SECRET;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    if (decoded.data.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }

    return decoded;
  });
};

const verifyCreateUser = async (req, res, next) => {
  const { error } = schemaCreate.validate(req.body);
  const { email, role } = req.body;
  
  if (error) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

  if (!validator(email)) {
    return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  }

  const users = await usersService.getAllUsers();
  const filterByEmail = users.filter((user) => user.email === email);

  if (filterByEmail.length > 0) {
    return res.status(409).json(errorMessage('Email already registered'));
  }

  if (role === 'admin') { 
    verifyToCreateAdmin(req, res); 
  }

  next();
};

module.exports = { verifyCreateUser };