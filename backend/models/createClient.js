'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const createClients = sequelize.define('createClients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordConfirmation: {
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

module.exports = createClients;
