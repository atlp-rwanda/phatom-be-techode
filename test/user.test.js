const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
<<<<<<< HEAD
const { users } = require('../models');
=======
const users = require('../models/users.js');
>>>>>>> a659b6f (Feat: (reset passord)- reste password)
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
	before((done) => {
<<<<<<< HEAD
		users.destroy({
			where: {
				where: { isDeleted : false }
			},
=======
		db.users.destroy({
			where: {},
>>>>>>> a659b6f (Feat: (reset passord)- reste password)
			truncate: true,
		});
		done();
	});
	it('should create a User', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
			password: 'test123',
<<<<<<< HEAD
=======
			email: 'delcy@gmail.com',
>>>>>>> a659b6f (Feat: (reset passord)- reste password)
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
<<<<<<< HEAD

	it('should generate token', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/token`);
		expect(response).to.have.status(200);
	});
	it('should logout from account', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/logout`);
		expect(response).to.have.status(404);
	});

=======
>>>>>>> a659b6f (Feat: (reset passord)- reste password)
});
