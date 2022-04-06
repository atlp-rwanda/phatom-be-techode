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
	
	it('should create a User with all info', async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'chance',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
		expect(response).to.have.status(201);
	});

	it('should not create a User without fullname', async () => {
		const user = {
			fullname: '',
			username: 'cyifuzo',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
		expect(response).to.have.status(400);
	});

	it('should not create a User without username', async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: '',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
		expect(response).to.have.status(401);
	});

	it('should not create a User without password', async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'chance',
			email: 'admin@andela.com',
			role: 'client',
			password: '',
		};
		const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
		expect(response).to.have.status(401);
	});

	it('should not create a one User twice', async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'chance',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
		expect(response).to.have.status(409);
	});

	it('should login with valid email and password', async () => {
		const user = {
			email: 'admin@andela.com',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
		expect(response).to.have.status(200);
	});

	it('should not login with invalid email or password', async () => {
		const user = {
			email: 'admin11@andela.com',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
		expect(response).to.have.status(401);
	});

	it('should not login without email', async () => {
		const user = {
			email: '',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
		expect(response).to.have.status(401);
	});

	it('should not login without password', async () => {
		const user = {
			email: 'admin11@andela.com',
			password: '',
		};
		const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
		expect(response).to.have.status(401);
	});
});
