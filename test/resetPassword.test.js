const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const users = require('../models/users.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
	before((done) => {
		db.users.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
	it('should create a User', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
			password: 'test123',
			email: 'delcy@gmail.com',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(201);
	});
	it('should not allow user to request resetting password without providing email', async () => {
		const user = {
			email: '',
			
		};
		const response = await chai.request(app).post(`/api/v1/accounts/forgot-password/`).send(user);
		expect(response).to.have.status(401);
	});

	it('should not allow user to request resetting password with  incorrect email', async () => {
		const user = {
			email: 'delyce@gmail.com',
			
		};
		const response = await chai.request(app).post(`/api/v1/accounts/forgot-password/`).send(user);
		expect(response).to.have.status(400);
	});
	
	it('should not allow user to request resetting password without providing email', async () => {
		const user = {
			token: '',
			
		};
		const response = await chai.request(app).post(`/api/v1/accounts/reset-password/:token`).send(user);
		expect(response).to.have.status(400);
	});

	it('should not allow user to request resetting password without providing email', async () => {
		const user = {
			resetoken: '5294ddc6-6642-4fcc-bdac-d0519b6faf97',
			
		};
		const response = await chai.request(app).post(`/api/v1/accounts/reset-password/:token`).send(user);
		expect(response).to.have.status(400);
	});
	it('should not allow user to request resetting password without providing email', async () => {
		const user = {
			tokenIsValid: '5294ddc6-6642-4fcc-bdac-d0519b6faf95',
			
		};
		const response = await chai.request(app).post(`/api/v1/accounts/reset-password/:token`).send(user);
		expect(response).to.have.status(400);
	});



	// it('should not create a User without password', async () => {
    // const user = {};
	// 	const response = await chai.request(app).post(`/api/v1/users`).send(user);
	// 	expect(response).to.have.status(500);
	// });

	// it('should Retieve all users', async () => {
	// 	const response = await chai.request(app).get(`/api/v1/users`);
	// 	expect(response).to.have.status(200);
	// });
});
