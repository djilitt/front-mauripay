const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const addDepot = sequelize.define('addDepot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
   
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = addDepot;
