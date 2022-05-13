'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('buses', [
       {
          bustype: 'Coaster',
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
     await queryInterface.removeConstraint("drivers","drivers_inhert_buses")
     await queryInterface.bulkDelete('drivers', null, {});
     await queryInterface.bulkDelete('buses', null, {});
  }
};
