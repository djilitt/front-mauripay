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
    await queryInterface.createTable('reponses', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        }, 
        telephone:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        nni: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      q1:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      q2:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      r1:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      r2:{
        type: DataTypes.STRING,
        allowNull: false,
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
     *f
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('reponses');

  }
};

