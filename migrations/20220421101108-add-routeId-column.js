'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn('buses', 'routeId',
     {
       type: Sequelize.INTEGER,
       allowNull: true,
       defaultValue: null,
       after: 'routecode',
    }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('buses', 'routeId'),
    ])
  },
};









