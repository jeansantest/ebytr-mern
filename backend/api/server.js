require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('../routes/todo');
const usersRouter = require('../routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/todo', todoRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));