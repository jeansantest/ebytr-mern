const { ObjectId } = require('mongodb');
const connection = require('./connection');

const TODO = 'todo';

const createTodo = async (name, todo) => {
  const createdAt = new Date();
  const status = 'pendente';
  const result = await connection()
    .then((db) => db.collection(TODO).insertOne({ 
      name, todo, status, createdAt,
    }))
    .then((inserted) => ({ id: inserted.insertedId, name, todo, status, createdAt }))
    .catch(() => null);

  return result;
};

const getAllTodo = async () => {
  const result = await connection()
    .then((db) => db.collection(TODO).find().toArray())
    .catch(() => null);

  return result;
};

const getTodosByName = async (name) => {
  const result = await connection()
    .then((db) => db.collection(TODO).find({ name }).toArray())
    .catch(() => null);

  return result;
};

const updateTodo = async (id, todo) => {
  const result = await connection()
    .then((db) => db.collection(TODO).findOneAndUpdate({ _id: ObjectId(id) }, { $set: { todo } }))
    .then((updated) => updated.value)
    .catch(() => null);
  
  return result;
};

module.exports = { createTodo, getAllTodo, getTodosByName, updateTodo };