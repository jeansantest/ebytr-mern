const connection = require('./connection');

const USERS = 'users';

const createUser = async (name, email, password, role = 'user') => {
  const result = await connection()
    .then((db) => db.collection(USERS).insertOne({ name, email, password, role }))
    .then((inserted) => ({ _id: inserted.insertedId, name, email, role }))
    .catch(() => null);
  
  return result;
};

const getAllUsers = async () => {
  const result = await connection()
    .then((db) => db.collection(USERS).find().toArray())
    .catch(() => null);

  return result;
};

module.exports = { createUser, getAllUsers };