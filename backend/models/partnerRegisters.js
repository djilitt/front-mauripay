const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');


const partnerRegister = sequelize.define('partnerRegisters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    min: {
        type: DataTypes.STRING,
        allowNull: false
    },
    max: {
        type: DataTypes.JSON,
        allowNull: false
    },
    plafond: {
        type: DataTypes.JSON,
        allowNull: false
    },
    description: {
        type: DataTypes.JSON,
        allowNull: false
    },
    account_number: {
        type: DataTypes.JSON,
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

module.exports = partnerRegisters;