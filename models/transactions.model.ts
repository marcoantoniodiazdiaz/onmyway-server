
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Transactions extends Model { }

Transactions.init({
    // TODO: Relacion con usuario
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
}, {
    sequelize, modelName: 'transactions',
});