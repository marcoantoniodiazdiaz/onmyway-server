
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Usuarios extends Model { }

Usuarios.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s]{5,255}$/
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^(USER_ROLE)|(DRIVER_ROLE)$/
        },
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    fondos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    cal: {
        type: DataTypes.ARRAY(DataTypes.DOUBLE),
        allowNull: false,
    },

}, {
    sequelize, modelName: 'usuarios'
});