'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('routes', [
       {
          name: 'Kabeza - Kicukiro',
          code: 401,
          city: "Kigali",
          startLocation: "-1.9797679,30.1100824",
          endLocation: "-2.004187,30.1171787",
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
