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
        },
        {
          bustype: 'Coaster',
          routecode: 402,
          platenumber:"RAD000Y"
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
