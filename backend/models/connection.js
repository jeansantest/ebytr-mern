const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGODB_URI } = process.env;
const DB_NAME = 'ebytr';
let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGODB_URI, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;