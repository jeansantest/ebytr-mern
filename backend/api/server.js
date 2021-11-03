const app = require('./app');

const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () =>
	console.log(`conectado na porta ${PORT}`)
);
