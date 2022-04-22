const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
import { v4 as uuid } from 'uuid';
import { resetTokens, users } from '../models';
const db = require('../models');
import { user, dummyEmail } from "../utils/testData"

chai.should();
chai.use(chaiHTTP);

describe('Reset password : All', () => {
	before((done) => {
		db.users.destroy({
			truncate : true, 
			cascade: true ,
			restartIdentity: true,
		});
		done();
	});
	it('should create a User', async () => {
		const response = await chai.request(app).post(`/api/v1/users`).send(user[3]);
		expect(response).to.have.status(201);
	});
	it('should not allow user to request resetting password without providing email', async () => {
		const user = {
			email: '',
		};
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send(user);
		expect(response).to.have.status(401);
	});

	it('render mail', async () => {
        
		const user = {
			email: 'daaaqk@example.com',
		};
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send(user);
		expect(response).to.have.status(200);
	});

	it('should not allow user to request resetting password with  incorrect email', async () => {
		const user = {
			email: 'delyce@gmail.com',
		};
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send(user);
		expect(response).to.have.status(400);
	});

	it('should not allow user to request resetting password without providing email', async () => {
		const password = {
			password: 'test12!D',
		};
		const response = await chai
			.request(app)
			.post(
				`/api/v1/accounts/reset-password/07ddb6ed-27cd-4dc1-9155-5ad9bd875b24`
			)
			.send(password);
		expect(response).to.have.status(400);
	});
	it('should allow user to request resetting password without providing email', async () => {
		
        const password = {
			password: 'test12!D',
		};
		const token1 = uuid();
		const user = await users.findOne({ where: { email: dummyEmail[0].email } });
		

		const resetToken = await resetTokens.create({
			user: user.id,
			token: token1,
		});
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/reset-password/${token1}`)
			.send(password);
		
		expect(response).to.have.status(200);
	});

	it('should requeste password reset ', async () => {
		const password = {
			password: 'test12!D',
		};
		const token1 = uuid();
		const user = await users.findOne({ where: { email: dummyEmail[0].email } });
	

		const resetToken = await resetTokens.create({
			user: user.id,
			token: token1,
		});
		const response = await chai
			.request(app)
			.get(`/api/v1/accounts/reset-password/${token1}`)
			.send(password);

		expect(response).to.have.status(200);
	});

	it('should allow user to request resetting password without providing unkown email', async () => {
		const password = {
			password: 'test12!D',
		};
		const token1 = uuid();
		const user = await users.findOne({ where: { email: dummyEmail[0].email } });
		
		const resetToken = await resetTokens.create({
			user: user.id,
			token: token1,
		});
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/reset-password/`)
			.send(password);
	
		expect(response).to.have.status(404);
	});

	
	it('should requeste password reset ', async () => {
		const password = {
			password: 'test12!D',
		};
		const token1 = uuid();
		const user = await users.findOne({ where: { email: dummyEmail[0].email } });
	

		const resetToken = await resetTokens.create({
			user: user.id,
			token: token1,
		});
		const response = await chai
			.request(app)
			.get(`/api/v1/accounts/reset-password/asdfhnnthyrthfghfffttyhuhu`)
			.send(password);

		expect(response).to.have.status(400);
	});
		
});