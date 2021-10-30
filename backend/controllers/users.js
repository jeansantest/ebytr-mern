const jwt = require('jsonwebtoken');
const usersServices = require('../services/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const { TODO_SECRET } = process.env;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (req.url.split('/')[2] === 'admin') {
    const admin = await usersServices.createUser(name, email, password, 'admin');

    return res.status(201).json({ ...admin });
  }
  
  const result = await usersServices.createUser(name, email, password);

  res.status(201).json({ ...result });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const id = '_id';
  const result = await usersServices.loginUser(email, password);

  if (!result) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign({ 
    data: { id: result[id], name: result.name, email: result.email, role: result.role }, 
  }, TODO_SECRET, jwtConfig);

  res.status(200).json({ token });
};

module.exports = { createUser, loginUser };