'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('buses', [
       {
          bustype: 'Couster',
          routecode: 401,
          platenumber:"RAD000X"
        }
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     * 
     */
     await queryInterface.bulkDelete('buses', null, {});
  }
};
