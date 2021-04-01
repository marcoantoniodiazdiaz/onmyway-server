import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuarios extends Document {
    nombre: string
    email: string
    password: string
    tipo: string
    foto: string
    telefono: string
    active: boolean
    google: boolean
    fondos: number
    cal: number[]
}

const UsuariosSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo "nombre" es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'El campo "password" es obligatorio'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El campo "email" es obligatorio'],
    },
    foto: {
        type: String,
        required: [true, 'El campo "foto" es obligatorio'],
    },
    telefono: {
        type: String,
        unique: true,
        required: [true, 'El campo "telefono" es obligatorio'],
    },
    tipo: {
        type: String,
        required: [true, 'El campo "tipo" es obligatorio'],
    },
    fondos: {
        type: Number,
        default: 0,
    },
    cal: {
        type: [Number],
        default: [],
    },
    google: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
});

// Export the model and return your IUsuarios interface
export default mongoose.model<IUsuarios>('Usuarios', UsuariosSchema);