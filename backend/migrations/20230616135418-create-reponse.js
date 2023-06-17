'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('reponse', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        }, 
        telephone:{
         type: DataTypes.STRING,
        allowNull: false,
        unique: true 
        },
      q1:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
      },
      q2:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
      },
      r1:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
      },
      r2:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
      },
       reponse: {
        type: DataTypes.JSON,
        allowNull: true
      },
      repExcepte: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
     *f
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('reponse');

  }
};

