// , id: random[randomIndex],
            //         id_partner: randomId[randomIndex],
            //         min: index + 10,
            //         max: index + 1000,
            //         montant: 10,
            //         type: "depot"

            const {
                DataTypes
            } = require('sequelize');
            const sequelize = require('../config/sequelize');
            
            const partnerUpdateFees = sequelize.define('partnerUpdateFees', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                idR: {
                    type: DataTypes.JSON,
                    allowNull: false
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
            
            module.exports = partnerUpdateFees;