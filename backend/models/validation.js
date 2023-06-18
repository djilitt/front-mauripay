'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const validation = sequelize.define('validation', {
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
   verso: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nni: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recto: {
    type: DataTypes.STRING,
    allowNull: true
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

module.exports = validation;
