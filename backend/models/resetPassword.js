'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const resetPassword = sequelize.define('resetPassword', {
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
    password:{
        type: DataTypes.STRING,
       allowNull: false,
       unique: true 
       },
       passwordConfirmation:{
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = resetPassword;
