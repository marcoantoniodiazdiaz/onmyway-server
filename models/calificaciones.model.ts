import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Calificaciones extends Model { }

Calificaciones.init({
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
    },
}, {
    sequelize, modelName: "calificaciones",
});