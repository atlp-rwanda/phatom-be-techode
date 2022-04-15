'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("drivers",{
      fields: ["userId"],
      type: "foreign key",
      name:"drivers_inhert_users",
      references:{
        table: "users",
        field: "id",        
        cascade: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("drivers","drivers_inhert_users")
  }
};
