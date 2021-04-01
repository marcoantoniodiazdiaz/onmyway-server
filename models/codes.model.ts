import mongoose, { Schema, Document } from 'mongoose';

export interface ICodes extends Document {
    email: string
    valor: string
}

const CodesSchema: Schema = new Schema({
    email: {
        type: String,
        required: ['true', 'El campo "email" es obligatorio'],
    },
    valor: {
        type: String,
        default: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString()
    },
});


// Export the model and return your ICodes interface
export default mongoose.model<ICodes>('Codes', CodesSchema);