import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Viajes extends Model { }

Viajes.init({
    fromLat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    fromLon: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    toLat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    toLon: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    fromEscrito: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    toEscrito: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
    // TODO: Relacion con el usuario
    // TODO: Relacion con el conductor
    // TODO: Relacion con el vehiculo
}, {
    sequelize, modelName: 'viajes'
});