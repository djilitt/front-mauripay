'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('codes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        }, 
        telephone:{
         type: DataTypes.INTEGER,
        allowNull: false,
        },
        code:{
            type: DataTypes.STRING,
           allowNull: false,
           unique: true 
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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
        });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('codes');

  }
};
