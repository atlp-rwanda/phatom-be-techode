'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
    */
      await queryInterface.bulkInsert('roles', [
        {
          rolename: 'Admin'
        },
        {
          rolename: 'Operator'
        },
        {
          rolename: 'Driver'
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
