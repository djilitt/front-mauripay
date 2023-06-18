'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const imageProfiles = sequelize.define('imageProfiles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  file: {
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = imageProfiles;
