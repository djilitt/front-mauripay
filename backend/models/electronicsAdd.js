const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const electronicsAdds = sequelize.define('electronicsAdds', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title_fr: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    title_ar: {
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

module.exports = electronicsAdds;
