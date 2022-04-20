'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
      fullname: 'magag',
			username: 'johndoe',
			telephone: '07884984564',
      password: 'test123',
			userType: 'Driver',
			email: 'daaak@example.com'
      },
      {
        fullname: 'operator',
        username: 'opone',
        telephone: '078809484564',
        password: 'test123',
        userType: 'Operator',
        email: 'daaask@example.com'
        }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
