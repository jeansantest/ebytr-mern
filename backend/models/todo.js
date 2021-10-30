const connection = require('./connection');

const TODO = 'todo';

const createTodo = async (name, todo) => {
  const date = new Date();
  const status = 'pendente';
  const result = await connection()
    .then((db) => db.collection(TODO).insertOne({ 
      name, todo, status, date,
    }))
    .then((inserted) => ({ id: inserted.insertedId, name, todo, status, date }))
    .catch(() => null);

  return result;
};

module.exports = { createTodo };