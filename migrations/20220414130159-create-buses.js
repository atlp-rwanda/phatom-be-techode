'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RouteName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      RouteNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Distance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ProfileImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      routecode: {
        type: Sequelize.INTEGER
      },
      platenumber: {
        type: Sequelize.STRING,        
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buses');
  }
};