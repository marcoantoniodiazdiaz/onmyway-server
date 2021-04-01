import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
    nombre: string
    valor: number
}

const ConfigSchema: Schema = new Schema({
    propiedad: {
        type: String,
        unique: true,
        required: [true, 'El campo "propiedad" es obligatorio'],
    },
    valor: {
        type: Number,
        required: [true, 'El campo "valor" es obligatorio'],
    },
});

// Export the model and return your IConfig interface
export default mongoose.model<IConfig>('Config', ConfigSchema);