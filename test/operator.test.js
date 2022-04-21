const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const operators = require('../models/operators.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : operators', () => {
	before((done) => {
		db.operators.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
	it('should create a Operator', async () => {
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'johndoe@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/operators/register`).send(operator);
		expect(response).to.have.status(201);
	});
	it('should not create already created Operator', async () => {
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'johndoe@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/operators/register`).send(operator);
		expect(response).to.have.status(409);
	});
	it('should not create a Operator without email', async () => {
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/operators/register`).send(operator);
		expect(response).to.have.status(422);
	});

	it('should not create a Operator without email', async () => {
    const operator = {};
		const response = await chai.request(app).post(`/api/v1/operators/register`).send(operator);
		expect(response).to.have.status(422);
	});

	it('should Retrieve all Operators', async () => {
		const response = await chai.request(app).get(`/api/v1/operators`);
		expect(response).to.have.status(200);
	});

	it('should not return a single operator for id that does not exist', async () => {
		const id = '198'
		const response = await chai.request(app).get(`/api/v1/operators/${id}`)
		expect(response).to.have.status(404);
	})
	
	it('should return an validation errors error', async () => {
		const id = '19a'
		const response = await chai.request(app).get(`/api/v1/operators/${id}`)
		expect(response).to.have.status(400);
	})
	it('should Return a single operator', async () => {
		const id = '1'
		const response = await chai.request(app).get(`/api/v1/operators/${id}`)
		expect(response).to.have.status(200);
	})
	it('should return validation errors errors on invalid delete', async () => {
		const id = 'null'
		const response = await chai.request(app).delete(`/api/v1/operators/${id}`)
		expect(response).to.have.status(400);
	})
	it('should Return not found if an id does not exist', async () => {
		const id = 1944
		const response = await chai.request(app).delete(`/api/v1/operators/${id}`)
		expect(response).to.have.status(404);
	})
	it('should not update a Operator without email', async () => {
		const id = 1999
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/operators/${id}`).send(operator);
		expect(response).to.have.status(404);
	});

	it('should not update a Operator without an id', async () => {
		const id = 'waka'
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'john@doe.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/operators/${id}`).send(operator);
		expect(response).to.have.status(400);
	});

	it('should update a Operator', async () => {
		const id = '1'
		const operator = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'john@doe.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/operators/${id}`).send(operator);
		expect(response).to.have.status(200);
	});

	it('should delete an operator', async () => {
		const id = '1'
		const response = await chai.request(app).delete(`/api/v1/operators/${id}`)
		expect(response).to.have.status(200);
	})
});
