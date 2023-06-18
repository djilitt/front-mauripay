'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const verificationFactures = sequelize.define('verificationFactures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    }, 
    ref:{
     type: DataTypes.STRING,
    allowNull: false,
    unique: true 
    },
    montant:{
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = verificationFactures;
