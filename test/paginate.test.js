const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { users } = require('../models');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : pagination', () => {
	before((done) => {
		done();
	});
	it('should get paginated list of a users', async () => {
            let page = '1'
            let limit = '1'
		const response = await chai.request(app).get(`/api/v1/users/paginated?page=${page}&limit=${limit}`)
		expect(response).to.have.status(200);
	})
});
