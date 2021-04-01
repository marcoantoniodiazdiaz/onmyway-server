import mongoose, { Schema, Document } from 'mongoose';

export interface IMarcas extends Document {
    nombre: string
    active: boolean
}

const MarcasSchema: Schema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El campo "nombre" es obligatorio'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

// Export the model and return your IMarcas interface
export default mongoose.model<IMarcas>('Marcas', MarcasSchema);