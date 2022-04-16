const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const buses = require('../models/buses.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

let token;
describe('Crud operation for buses ', () => {
	
    before((done) => {
		db.users.destroy({
			truncate: true,
			restartIdentity: true,
		});
		done();
	});
	beforeEach(async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'cyifuzo',
			email: 'operator@andela.com',
			role: 'client',
			password: 'test123',
		};
		await chai.request(app).post(`/api/v1/users/login/register`).send(user);
	});
	beforeEach(async () => {
		let user = {
			email: 'operator@andela.com',
			password: 'test123',
		};

		const response = await chai
			.request(app)
			.post('/api/v1/users/login')
			.send(user);

		token = response.body.data.token;
	});
	afterEach(async () => {
		await db.users.destroy({
			truncate: true,
			restartIdentity: true,
		});
	});

	it('should Retieve all permissions', async () => {
		const response = await chai.request(app).get(`/api/v1/buses`);
		expect(response).to.have.status(200);
	});
	it('should assign bus create permission to the operator role', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/roles/permission/assign`)
			.send({
				roleid: 2,
				permissionid: 11,
			});

		expect(response).to.have.status(200);
	});
	it('should assign bus delete permission to the operator role', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/roles/permission/assign`)
			.send({
				roleid: 2,
				permissionid: 12,
			});

		expect(response).to.have.status(200);
	});
	it('should assign bus update permission to the operator role', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/roles/permission/assign`)
			.send({
				roleid: 2,
				permissionid: 13,
			});

		expect(response).to.have.status(200);
	});
	it('should assign create-route permission to the operator role', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/roles/permission/assign`)
			.send({
				roleid: 2,
				permissionid: 6,
			});

		expect(response).to.have.status(200);
	});
	it('Should assign role ', (done) => {
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
				chai.expect(res).to.have.status(200);
				done();
			});
	});
	it('Should access create route ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should should be permitted to access route');
				chai
					.request(app)
					.post(`/api/v1/roles/createAccessTest`)
					.set({
						userId: 1,
						action: 'createRoute',
						'auth-token': 'Bearer ' + token,
					})
					.end((err, res) => {
						chai.expect(res).to.have.status(201);
                        console.log('should remove the role');
						chai
							.request(app)
							.delete(`/api/v1/roles/remove/users`)
							.send({
								roleId: 2,
								userId: 1,
							})
							.end((err, res) => {
								chai.expect(res).to.have.status(200);
								done();
							});
					});
			});
	});
    it("Should not access create route without login ",(done) => {
        chai
        .request(app)
        .post(`/api/v1/roles/createAccessTest`)
        .set({
            userId: 1,
            action: 'createRoute',
            'auth-token': 'Bearer' + token,
        })
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            done();
        });
    })
    it("Should get all buses ",(done) => {
        chai
        .request(app)
        .get(`/api/v1/buses`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        });
    })
    it("Should get single bus ",(done) => {
        chai
        .request(app)
        .get(`/api/v1/buses/1`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        });
    })
    it("Should not get single bus if does not exist",(done) => {
        chai
        .request(app)
        .get(`/api/v1/buses/14`)
        .end((err, res) => {
            chai.expect(res).to.have.status(404);
            done();
        });
    })
    it("Should not get single bus if id is invalid",(done) => {
        chai
        .request(app)
        .get(`/api/v1/buses/fgdhg`)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            done();
        });
    })
    it('Should access create bus ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should create bus');
                chai
                    .request(app)
                    .post(`/api/v1/buses/register`)
                    .send( {
                        bustype: 'Couster',
                        routecode: 401,
                        platenumber:"RAD0023X"
                      })                      
                    .set({
						userId: 1,
						action: 'createBus',
						'auth-token': 'Bearer ' + token,
					})
                    .end((err, res) => {
                        console.log('should create bus');
                        chai.expect(res).to.have.status(201);
                        done();
                    });
			});
	});

    it('Should not access create bus if plate exist', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should create bus');
                chai
                    .request(app)
                    .post(`/api/v1/buses/register`)
                    .send( {
                        bustype: 'Couster',
                        routecode: 401,
                        platenumber:"RAD0023X"
                      })                      
                    .set({
						userId: 1,
						action: 'createBus',
						'auth-token': 'Bearer ' + token,
					})
                    .end((err, res) => {
                        console.log('should create bus');
                        chai.expect(res).to.have.status(400);
                        done();
                    });
			});
	});

    it('Should not create bus if inputs are invalid', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should create bus');
                chai
                    .request(app)
                    .post(`/api/v1/buses/register`)
                    .send( {
                        bustype: 'Couster',
                        routecode: 401,
                        platenumber:""
                      })                      
                    .set({
						userId: 1,
						action: 'createBus',
						'auth-token': 'Bearer ' + token,
					})
                    .end((err, res) => {
                        console.log('should create bus');
                        chai.expect(res).to.have.status(400);
                        done();
                    });
			});
	});

    it('Should access delete the bus ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should delete bus');
                chai
                    .request(app)
                    .delete(`/api/v1/buses/1`)
                    .set({
						userId: 1,
						action: 'deleteBus',
						'auth-token': 'Bearer ' + token,
					})
                    .end((err, res) => {
                        console.log('should delete bus');
                        chai.expect(res).to.have.status(200);
                        done();
                    });
			});
	});
    it('Should not access delete the bus if it does not exist ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should delete bus');
                chai
                    .request(app)
                    .delete(`/api/v1/buses/567`)
                    .set({
						userId: 1,
						action: 'deleteBus',
						'auth-token': 'Bearer ' + token,
					})
                    .end((err, res) => {
                        console.log('should not delete bus');
                        chai.expect(res).to.have.status(404);
                        done();
                    });
			});
	});
    it('Should access update the bus ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update bus');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateBus',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(200);
                        done();
                    });
			});
	});
    it('Should not access update the bus with not unique plate number', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update bus');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateBus',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(400);
                        done();
                    });
			});
	});
    it('Should access update not the bus if some of the inputs are invalid', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update bus');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateBus',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:""
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(400);
                        done();
                    });
			});
	});
    it('Should not access update the bus if bus not exist ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update bus');
                chai
                    .request(app)
                    .put(`/api/v1/buses/456`)
                    .set({
						userId: 1,
						action: 'updateBus',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(404);
                        done();
                    });
			});
	});
    it('Should not access update the route if his not permitted to ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update not update route');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateRoute',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(401);
                        done();
                    });
			});
	});
    it('Should not access update the route if his not permitted to ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update not update route');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateRoutasdfase',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(401);
                        done();
                    });
			});
	});
    it('Should not access update the route action is invalid ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 2,
			})
			.end((err, res) => {
                console.log('should update not update route');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: '',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(400);
                        done();
                    });
			});
	});
    it('Should not access update the bus if   ', (done) => {
        
        console.log('should update not update route');
        chai
            .request(app)
            .put(`/api/v1/buses/2`)
            .set({
                userId: 1,
                action: 'updateRoute',
                'auth-token': 'Bearer ' + token,
            })
            .send( {
                bustype: 'CousterUpdate',
                routecode: 406,
                platenumber:"RAD0024X"
                }) 
            .end((err, res) => {
                console.log('should update bus');
                chai.expect(res).to.have.status(401);
                done();
            });
		
	});
    it('Should not access update if user role has no permission ', (done) => {
        console.log('should assign role');
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 1,
				roleId: 3,
			})
			.end((err, res) => {
                console.log('should update not update route');
                chai
                    .request(app)
                    .put(`/api/v1/buses/2`)
                    .set({
						userId: 1,
						action: 'updateRoute',
						'auth-token': 'Bearer ' + token,
					})
                    .send( {
                        bustype: 'CousterUpdate',
                        routecode: 406,
                        platenumber:"RAD0024X"
                      }) 
                    .end((err, res) => {
                        console.log('should update bus');
                        chai.expect(res).to.have.status(401);
                        done();
                    });
			});
	});
});
