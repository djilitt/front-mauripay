'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const countryUpdateFees = sequelize.define('countryUpdateFees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idR: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    end: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = countryUpdateFees;
