const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const elecAdds = sequelize.define('elecAdds', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    wording: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    email: {
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

module.exports = elecAdds;
