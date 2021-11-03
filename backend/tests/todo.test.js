const app = require('../api/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('/todo', () => {
	it('get /todo', (done) => {
		chai
			.request(app)
			.get('/todo')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(JSON.parse(res.text)).to.have.property('todos');
				expect(JSON.parse(res.text).todos).to.be.an('array');
				done();
			});
	});

	it('get /todo/:name fail', (done) => {
		chai
			.request(app)
			.get('/todo/te')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(JSON.parse(res.error.text)).to.deep.include({
					message: 'Invalid name',
				});
				done();
			});
	});

	it('post /todo missing token', (done) => {
		chai
			.request(app)
			.post('/todo')
			.send({ todo: 'Teste' })
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(JSON.parse(res.error.text)).to.deep.include({
					message: 'missing auth token',
				});
				done();
			});
	});

	it('put /todo/:id missing token', (done) => {
		chai
			.request(app)
			.put('/todo/61813b97f28a1c22317dd07f')
			.send({ todo: 'Testandooo' })
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(JSON.parse(res.text)).to.deep.include({
					message: 'missing auth token',
				});
				done();
			});
	});

	it('put /todo/:id success', (done) => {
		chai
			.request(app)
			.post('/users/login')
			.send({ email: 'jean@gmail.com', password: '123456' })
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(JSON.parse(res.text)).to.have.property('token');
				const token = JSON.parse(res.text).token;
				chai
					.request(app)
					.put('/todo/61813b97f28a1c22317dd07f')
					.set('Authorization', token)
					.send({ todo: 'Testandooo' })
					.end((err, res) => {
						expect(res).to.have.status(200);
						expect(JSON.parse(res.text)).to.deep.include({
							todo: 'Testandooo',
						});
					});
				done();
			});
	});
});
