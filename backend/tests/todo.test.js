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

	it('post /todo', (done) => {
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
});
