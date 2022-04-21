const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const users = require('../models/users.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Lang test', () => {
	before((done) => {
		db.users.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
	it('Test', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
		};
		const response = await chai.request(app).get(`/api/v1/lng/welcome`);
		expect(response).to.have.status(200);
	});
});
