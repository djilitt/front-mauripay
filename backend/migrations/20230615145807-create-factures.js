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
    await queryInterface.createTable('factures', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        }, 
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        }, 
        refFacture:{
         type: DataTypes.STRING,
        allowNull: false,
        unique: true 
        },
        montant:{
        type: DataTypes.STRING,
        allowNull: false
        },
        societe:{
            type: DataTypes.STRING,
            allowNull: false
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
    await queryInterface.dropTable('factures');

  }
};
