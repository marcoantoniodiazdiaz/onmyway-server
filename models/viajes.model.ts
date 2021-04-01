import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IViajes extends Document {
    fromLat: number
    fromLon: number
    toLat: number
    toLon: number
    fromEscrito: string
    toEscrito: string
    usuarioId: string
    conductor: string
    vehiculo: string
    fecha: string
    precio: number
    distancia: number
}

const ViajesSchema: Schema = new Schema({
    fromLat: {
        type: Number,
        required: [true, 'El campo "fromLat" es obligatorio'],
    },
    fromLon: {
        type: Number,
        required: [true, 'El campo "fromLon" es obligatorio'],
    },
    toLat: {
        type: Number,
        required: [true, 'El campo "toLat" es obligatorio'],
    },
    toLon: {
        type: Number,
        required: [true, 'El campo "toLon" es obligatorio'],
    },
    fromEscrito: {
        type: String,
        required: [true, 'El campo "fromEscrito" es obligatorio'],
    },
    toEscrito: {
        type: String,
        required: [true, 'El campo "toEscrito" es obligatorio'],
    },
    usuarioId: {
        type: ObjectId,
        ref: 'Usuarios',
        required: [true, 'El campo "usuarioId" es obligatorio'],
    },
    conductor: {
        type: ObjectId,
        ref: 'Usuarios',
        default: null,
    },
    vehiculo: {
        type: ObjectId,
        ref: 'Vehiculos',
        default: null,
    },
    fecha: {
        type: String,
        required: [true, 'El campo "fecha" es obligatorio'],
    },
    distancia: {
        type: Number,
        required: [true, 'El campo "distancia" es obligatorio'],
    },
    precio: {
        type: Number,
        required: [true, 'El campo "precio" es obligatorio'],
    },
});

// Export the model and return your IViajes interface
export default mongoose.model<IViajes>('Viajes', ViajesSchema);