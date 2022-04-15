'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('routes', [
       {
          name: 'Couster',
          code: 401,
          city: "Kigali",
          startLocation: "0.12255225514",
          endLocation: "30.523562",
          duration: "30",
          distance: "10" 
        }
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     * 
     */
     await queryInterface.bulkDelete('routes', null, {});
  }
};
