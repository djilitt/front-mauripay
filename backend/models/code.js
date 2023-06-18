'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const code = sequelize.define('code', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.INTEGER,
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

module.exports = code;
