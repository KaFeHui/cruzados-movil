import mongoose, { Schema, Document } from 'mongoose';
import { Counter } from './counter';
import { IMeal } from './meal.model';

export interface IFood extends Document {
    _id: mongoose.Types.ObjectId;
    id: number;
    nombre: string;
    porcion: number;
    foto?: string;
    horaEvento: string; // HH:mm
    ingredientes: mongoose.Types.ObjectId[];
    estado: 'Programado' | 'Pendiente' | 'Realizado' | 'Omitido'
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
    meal: IMeal
}

const FoodSchema = new Schema<IFood>(
    {
        id: { type: Number, unique: true },
        nombre: { type: String, required: true, trim: true },
        porcion: { type: Number, required: true },
        horaEvento: { type: String, required: true },
        foto: { type: String },
        meal: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
        ingredientes: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
        estado: {
            type: String,
            default: 'Pendiente',
        },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Middleware para id autoincremental con auto-healing
FoodSchema.pre('save', async function (next) {
    if (this.isNew) {
        let nextId: number;

        const counter = await Counter.findByIdAndUpdate(
            'foodId',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        nextId = counter.seq;

        const exists = await mongoose.models.Food.findOne({ id: nextId });

        if (exists) {
            const last = await mongoose.models.Food.findOne().sort({ id: -1 });
            const lastId = last ? last.id : 0;

            await Counter.findByIdAndUpdate(
                'foodId',
                { seq: lastId },
                { new: true, upsert: true }
            );

            nextId = lastId + 1;
        }
        this.id = nextId;
    }
    next();
});

export const Food = mongoose.model<IFood>('Food', FoodSchema);
