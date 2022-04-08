const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const users = require('../models/users.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('permissions testing', () => {
	before((done) => {
		done();
	});

	it('should Retieve all permissions', async () => {
		const response = await chai.request(app).get(`/api/v1/permissions`);
		expect(response).to.have.status(200);
	});
});
