const usersModels = require('../models/users');

const createUser = (name, email, password, role) => {
  const result = usersModels.createUser(name, email, password, role);
  return result;
};

const getAllUsers = () => {
  const result = usersModels.getAllUsers();
  return result;
};

const loginUser = (email, password) => {
  const result = usersModels.loginUser(email, password);
  return result;
};

module.exports = { createUser, getAllUsers, loginUser };