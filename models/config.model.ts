import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Config extends Model { }

Config.init({
    propiedad: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize, modelName: 'config',
});