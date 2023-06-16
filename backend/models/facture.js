'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const factures = sequelize.define('factures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    }, 
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    }, 
    ref_facture:{
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = factures;
