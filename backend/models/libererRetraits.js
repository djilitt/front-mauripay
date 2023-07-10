const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const libererRetraits = sequelize.define('libererRetraits', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idR: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    fee: {
        type: DataTypes.STRING,
        allowNull: true,
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

module.exports = libererRetraits;
