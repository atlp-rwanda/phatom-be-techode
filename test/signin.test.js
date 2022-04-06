const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
	before((done) => {
		db.users.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
    it('It should login with email and password', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({ email: users.email, password: 'test123' })
          .end((err, response) => {
            response.should.have.status(200);
            done();
          });
      });
      it('Admin should login with Pre confogured credentials', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({ email: 'admin@andela.com', password: 'test123' })
          .end((err, response) => {
            response.should.have.status(200);
            done();
          });
      });
      it('It should not login with Invalid password', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({ email: 'driver@andela.com', password: 'test123456789' })
          .end((err, response) => {
            response.should.have.status(400);
            done();
          });
      });
      it('It should not login with null password', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({ email: 'driver@andela.com', password: null })
          .end((err, response) => {
            response.should.have.status(400);
            done();
          });
      });
      it('It should not login with null email', (done) => {
        chai.request(app)
          .post('/api/v1/users/login')
          .send({ email: null, password: 'test1235' })
          .end((err, response) => {
            response.should.have.status(400);
            done();
          });
      });
      it('should not login with unregistred email', (done) => {
        chai.request(app)
          .post('/api/v1/users/login')
          .send({ email: 'delyse@gmail.com', password: 'test123' })
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
})