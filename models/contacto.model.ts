
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Contactos extends Model { }

Contactos.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-ZA-Z\s]{5,255}$/
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },

    // TODO: "de" Relacion con usuario
}, {
    sequelize, modelName: 'contactos',
});