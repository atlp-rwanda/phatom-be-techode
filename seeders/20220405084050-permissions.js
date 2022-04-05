'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('permissions', 
      [
        {
          permsision_name: 'Get routes'
        },
        {
          permsision_name: 'Get buses'
        },
        {
          permsision_name: 'Assign buses'
        },
        {
          permsision_name: 'Create route'
        }
      ] 
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
