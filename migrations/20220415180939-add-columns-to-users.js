'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn('users', 'userType',
     {
       type: Sequelize.STRING,
       allowNull: true,
       defaultValue: null,
       after: 'email',
    }),
    await queryInterface.addColumn('users', 'telephone',
     {
       type: Sequelize.STRING,
       allowNull: true,
       defaultValue: null,
       after: 'username',
    }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'userType'),
      queryInterface.removeColumn('users', 'telephone'),
    ])
  },
};
