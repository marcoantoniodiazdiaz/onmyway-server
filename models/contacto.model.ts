import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IContacto extends Document {
    nombre: string
    email: string
    active: boolean
}

const ContactoSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo "nombre" es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El campo "email" es obligatorio'],
    },
    de: {
        type: ObjectId,
        ref: 'Usuarios',
        required: [true, 'El campo "de" es obligatorio'],
    }
});

// Export the model and return your IContacto interface
export default mongoose.model<IContacto>('Contactos', ContactoSchema);