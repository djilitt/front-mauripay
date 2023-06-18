const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const verificationCartes = sequelize.define('verificationCartes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  montant: {
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

module.exports = verificationCartes;
