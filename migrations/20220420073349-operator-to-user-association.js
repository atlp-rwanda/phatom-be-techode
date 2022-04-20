'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("operators",{
      fields: ["userId"],
      type: "foreign key",
      name:"operators_inhert_users",
      references:{
        table: "users",
        field: "id"
      },
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("operators","operators_inhert_users")
  }
};
