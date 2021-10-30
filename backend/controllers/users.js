const jwt = require('jsonwebtoken');
const usersServices = require('../services/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const { TODO_SECRET } = process.env;

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  let token;

  if (req.url.split('/')[2] === 'admin') {
    const admin = await usersServices.createUser(name, email, password, 'admin');
    token = jwt.sign({ data: req.body }, TODO_SECRET, jwtConfig);
    return res.status(201).json({ ...admin, token });
  }
  
  const result = await usersServices.createUser(name, email, password, role);
  token = jwt.sign({ data: req.body }, TODO_SECRET, jwtConfig);
  res.status(201).json({ ...result, token });
};

module.exports = { createUser };