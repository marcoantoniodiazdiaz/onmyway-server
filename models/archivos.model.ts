import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IArchivos extends Document {
    usuario: string
    url: string
    tipo: string
    fecha: string
    active: boolean
}

const ArchivosSchema: Schema = new Schema({
    usuario: {
        type: ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    url: {
        type: String,
        required: ['true', 'El campo "url" es obligatorio'],
    },
    tipo: {
        type: String,
        required: ['true', 'El campo "url" es obligatorio'],
    },
    fecha: {
        type: String,
        default: new Date().toISOString(),
    },
    active: {
        type: Boolean,
        default: true,
    },

});


// Export the model and return your IArchivos interface
export default mongoose.model<IArchivos>('Archivos', ArchivosSchema);