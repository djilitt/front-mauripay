const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const credits = sequelize.define('credits', {
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
  operateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  montant: {
    type: DataTypes.INTEGER,
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

module.exports = credits;
