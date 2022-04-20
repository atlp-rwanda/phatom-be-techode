const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { users } = require('../models');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users and profile', () => {
	before((done) => {
		users.destroy({
			where: {
				where: { isDeleted: false }
			},
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
			profileImage: 'https://cdn.pixabay.com/photo/2018/03/15/23/16/car-3229816__480.jpg',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(201);
	});

	it('should not create a User without password', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(400);
	});

	it('should not create a User without password', async () => {
		const user = {};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(500);
	});

	it('should Retieve all users', async () => {
		const response = await chai.request(app).get(`/api/v1/users`);
		expect(response).to.have.status(200);
	});

	it('should generate token', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/token`);
		expect(response).to.have.status(200);
	});
	it('should logout from account', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/logout`);
		expect(response).to.have.status(404);
	});
});
