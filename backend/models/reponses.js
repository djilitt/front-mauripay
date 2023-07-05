'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const reponses = sequelize.define('reponses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  q1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  q2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  r1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  r2: {
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
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = reponses;
