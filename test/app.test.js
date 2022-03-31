const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const { app }  = require('../app.js');
const users  = require('../models/users.js');
const should = chai.should();

chai.use(chaiHTTP);
chai.should();

<<<<<<< HEAD
describe('Test one : Entry', () => {

  before((done) => {
    done();
=======
describe('Test one : users', () => {

  before((done) => {
    // app.on("Started", () => {
      done();
    // })	
>>>>>>> a659b6f (Feat: (reset passord)- reste password)
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
<<<<<<< HEAD
=======

  

>>>>>>> a659b6f (Feat: (reset passord)- reste password)
});
