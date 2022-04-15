'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('busStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      busId: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      busstatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('busStatuses');
  }
};