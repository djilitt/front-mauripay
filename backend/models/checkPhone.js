'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const checkPhone = sequelize.define('checkPhone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    }, 
    telephone:{
     type: DataTypes.INTEGER,
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = checkPhone;
