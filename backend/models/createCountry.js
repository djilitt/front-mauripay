const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const createCountries = sequelize.define('createCountries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    title_fr: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    title_ar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    min: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    max: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rate: {
        type: DataTypes.INTEGER,
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

module.exports = createCountries;
