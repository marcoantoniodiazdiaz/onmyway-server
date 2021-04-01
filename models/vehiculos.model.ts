import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IVehiculos extends Document {
    placa: string
    marca: string
    submarca: string
    color: string
    poliza: string
    cliente: string
    foto: string
    active: boolean
}

const VehiculosSchema: Schema = new Schema({
    placa: {
        type: String,
        unique: true,
        required: [true, 'El campo "placa" es obligatorio'],
    },
    marca: {
        type: ObjectId,
        ref: 'Marcas',
        required: [true, 'El campo "marca" es obligatorio'],
    },
    submarca: {
        type: String,
        required: [true, 'El campo "submarca" es obligatorio'],
    },
    color: {
        type: String,
        required: [true, 'El campo "color" es obligatorio'],
    },
    cliente: {
        type: ObjectId,
        ref: 'Usuarios',
        required: [true, 'El campo "cliente" es obligatorio'],
    },
    foto: {
        type: String,
        required: [true, 'El campo "foto" es obligatorio'],
    },
    poliza: {
        type: String,
        required: [true, 'El campo "poliza" es obligatorio'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

// Export the model and return your IVehiculos interface
export default mongoose.model<IVehiculos>('Vehiculos', VehiculosSchema);