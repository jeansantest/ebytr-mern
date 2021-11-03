const app = require('../api/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const usersService = require('../services/users');

const { expect } = chai;
chai.use(chaiHttp);

describe('Post /users/signup', () => {
	it('service post signup fail', () => {
		const postSignUp = usersService.createUser('', '', '');
		expect(usersService.createUser).to.be.a('function');
		return expect(postSignUp).to.equal(null);
	});

	it('controller post signup fail', (done) => {
		chai
			.request(app)
			.post('/users/signup')
			.send({ name: '', email: 'jean@gmail.com', password: '123456' })
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(JSON.parse(res.error.text)).to.deep.include({
					message: 'Invalid entries. Try again.',
				});
			});
		done();
	});
});

describe('Post /users/login', () => {
	it('post login success', function (done) {
		chai
			.request(app)
			.post('/users/login')
			.send({ email: 'jean@gmail.com', password: '123456' })
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(JSON.parse(res.text)).to.have.property('token');
				done();
			});
	});

	it('post login fail', function (done) {
		chai
			.request(app)
			.post('/users/login')
			.send({ email: 'jean@gmail.com', password: '123' })
			.end(function (err, res) {
				// .set("Authorization", "Bearer " + token)
				expect(res).to.have.status(401);
				expect(JSON.parse(res.text)).to.have.property('message');
				done();
			});
	});
});
