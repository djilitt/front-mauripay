const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const addbanks= sequelize.define('addbanks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
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

module.exports = addbanks;
