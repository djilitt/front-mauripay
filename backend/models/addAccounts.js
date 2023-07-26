const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const addAccounts = sequelize.define('addAccounts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    account_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    solde:{
        type: DataTypes.INTEGER, 
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

module.exports = addAccounts;
