const usersModels = require('../models/users');

const createUser = (name, email, password, role) => {
	if (!name || !email || !password) return null;
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
