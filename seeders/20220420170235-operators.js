'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('operators', [{
      userId:1, 
      location:'Kicukiro'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('operators', null, {});
  }
};
