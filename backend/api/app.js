require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('../routes/todo');

const app = express();
require('dotenv').config({ path: './config.env' });

app.use(cors());
app.use(express.json());
app.use('/todo', todoRouter);

module.exports = app;