const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const updateAgencys = sequelize.define('updateAgencies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idR: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    fournisseur: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    commune: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    agency: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    phone: {
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

module.exports = updateAgencies;
