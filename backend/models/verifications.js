'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const verifications = sequelize.define('verifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destinataire: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exceptedSolde: {
        type: DataTypes.BOOLEAN, // Updated from DataTypes.STRING
        allowNull: false
    },
    exceptedDestinataire: {
        type: DataTypes.BOOLEAN, // Updated from DataTypes.STRING
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

module.exports = verifications;
