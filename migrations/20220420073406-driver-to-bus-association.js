'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("drivers",{
      fields: ["busId"],
      type: "foreign key",
      name:"drivers_inhert_buses",
      references:{
        table: "buses",
        field: "id",
        cascade: true
      },
      
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("drivers","drivers_inhert_buses")
  }
};
