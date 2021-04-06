
import { DataTypes, Model } from 'sequelize/types';
import sequelize from '../database/database';

export class Marcas extends Model { }

Marcas.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize, modelName: 'marcas'
});