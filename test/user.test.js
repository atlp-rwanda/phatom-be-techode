import chai,{ expect }  from "chai"
import chaiHTTP from "chai-http"
import { app } from "../app"
import users from "../models/users.js"
import db from "../models"
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
	before((done) => {
		// users.destroy({
		// 	where: {
		// 		where: { isDeleted: false },
		// 	},
		// 	truncate: true,
		// });
		done();
	});

	it('should create a User', async () => {
		const user = {
			firstname: 'cyifuzo',
			lastname: 'jean chrysostome',
			username: 'chance',
			telephone: '07884764564',
			userType: 'Driver',
			email: 'daak@example.com'
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("New user have been created");
		expect(response).to.have.status(201);
	});
	it('should not create an existing User', async () => {
		const driver = {
			firstname: 'cyifuzo',
			lastname: 'jean chrysostome',
			username: 'chance',
			telephone: '07884764564',
			userType: 'Driver',
			email: 'cyifuzo@example.com'
		};
		const response = await chai.request(app).post(`/api/v1/users/`).send(driver);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("user exist");
		expect(response).to.have.status(409);
	});

	it('should not create a User without email', async () => {
		const driver = {
			firstname: 'cyifuzo',
			lastname: 'jean chrysostome',
			username: 'chance',
			telephone: '07884764564',
			userType: 'Driver',
		};
		const response = await chai.request(app).post(`/api/v1/users/`).send(driver);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		expect(response).to.have.status(400);
	});
	it('should not create a User without complete fields', async () => {
		const user = {
			firstname: 'cyifuzo jean chrysostome',
			username: 'chance',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		expect(response).to.have.status(400);
	});

	it('should not create a User without entering all required fields', async () => {
    const user = {};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(400);
	});

	it('should Retrieve all users', async () => {
		const response = await chai.request(app).get(`/api/v1/users`);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.users.should.be.a('array');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Retrieved");
		expect(response).to.have.status(200);
	});

	it('should generate token', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/token`);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Token created");
		expect(response).to.have.status(200);
	});
	it('should logout from account', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/logout`);
		expect(response).to.have.status(404);
	});
});
