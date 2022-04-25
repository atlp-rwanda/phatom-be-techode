'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('drivers', [{
      userId:1, 
      busId:1, 
      driversLicense: 'license'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('drivers', null, {});
  }
};
