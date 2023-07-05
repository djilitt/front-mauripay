const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const getRetraitImaras = sequelize.define('getRetraitImaras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
  
    type: {
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
    },
   
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = getRetraitImaras;
