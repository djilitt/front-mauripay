const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

// "id_partner":4,
// "min":10,
// "max":1000,
// "montant":10,
// "type":"depot"
const partnerAddFee = sequelize.define('partnerAddFee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_partner: {
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
    montant: {
        type: DataTypes.JSON,
        allowNull: false
    },
    type: {
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

module.exports = partnerAddFee;