'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("elecAdds", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    wording: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    repExcepte: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    reponse: {
        type: DataTypes.JSON,
        allowNull: true
    },
    
    Test: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("elecAdds");
  }
};
