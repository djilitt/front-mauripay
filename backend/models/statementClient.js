const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const statementClients = sequelize.define('statementClients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    idR: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date1:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date2:{
        type: DataTypes.STRING,
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

module.exports = statementClients;
