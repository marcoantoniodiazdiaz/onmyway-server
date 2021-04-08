
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Codes extends Model { }

Codes.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{6}$/
        },
    },
}, {
    sequelize, modelName: "codes",
});