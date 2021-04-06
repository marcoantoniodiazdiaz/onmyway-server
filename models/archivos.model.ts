import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Archivos extends Model { }

Archivos.init({
    // Usuario
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
}, {
    sequelize, modelName: "archivos",
});