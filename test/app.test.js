const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const { app }  = require('../app.js');
const users  = require('../models/users.js');
const should = chai.should();

chai.use(chaiHTTP);
chai.should();

describe('Test one : users', () => {

  before((done) => {
    done();
  })

	it('Backend root director test', (done) => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
