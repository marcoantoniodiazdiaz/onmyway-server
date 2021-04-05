import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { DataTypes, Model } from 'sequelize/types';
import sequelize from '../database/database';

export class Vehiculos extends Model { }

Vehiculos.init({
    // TODO: Relacion con marcas
    // TODO: Relacion con usuario
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 10,
        },
    },
    submarca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 55],
        },
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 55],
        },
    },

}, {
    sequelize, modelName: 'vehiculos',
});