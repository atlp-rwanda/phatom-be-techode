'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
<<<<<<< HEAD
     await queryInterface.createTable('reset-token', { 
=======
     await queryInterface.createTable('resetTokens', { 
>>>>>>> d09380dbd00312c47ba4d26826fb3cbf105e222f
      id:{
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      expiration:{
        allowNull: true,
        type: Sequelize.DATE,
      }, 
      user:{
        allowNull: true,
        type: Sequelize.STRING,
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
<<<<<<< HEAD
        
      
      });
=======
    });
>>>>>>> d09380dbd00312c47ba4d26826fb3cbf105e222f
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
<<<<<<< HEAD
     await queryInterface.dropTable('reset-token');
=======
     await queryInterface.dropTable('resetTokens');
>>>>>>> d09380dbd00312c47ba4d26826fb3cbf105e222f
  }
};
