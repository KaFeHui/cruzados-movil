import mongoose, { Schema, Document } from 'mongoose';
import { Counter, getNextSequence } from './counter';

export interface IIngredient extends Document {
    id: number;
    nombre: string;
    descripcion?: string;
    tipoPeso?: string /*'gr' "ml"*/,
    cantidad?: number;
    calorias?: number; // energia
    humedad?: number;
    cenizas?: number
    proteinas?: number;
    hdc?: number // hidratos de carbono
    azucar?: number;
    fibra?: number;
    lipidos?: number;
    acSaturados?: number;
    acMonoinsaturados?: number;
    acPoliinsaturados?: number;
    colesterol?: number;
    vitA?: number;
    vitC?: number;
    vitD?: number;
    vitE?: number;
    vitK?: number;
    vitB1?: number;
    vitB2?: number;
    niacina?: number;
    vitB6?: number;
    ac?: number //pantotenico mg
    vitB12?: number;
    Folatos?: number;
    sodio?: number;
    potasio?: number;
    calcio?: number;
    fosforo?: number;
    magnesio?: number;
    hierro?: number;
    zinc?: number;
    cobre?: number;
    selenio?: number;
    carbohidratos?: number;
    grasas?: number;
    createdAt: Date;
    updatedAt: Date;
    state?: boolean;
}

const IngredientSchema = new Schema<IIngredient>(
    {
        id: { type: Number, unique: true },
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        cantidad: { type: Number, required: true },
        tipoPeso: { type: String, required: true },
        // Valores nutricionales
        calorias: { type: Number, default: 0 },
        carbohidratos: { type: Number, default: 0 },
        proteinas: { type: Number, default: 0 },
        grasas: { type: Number, default: 0 },
        fibra: { type: Number, default: 0 },
        azucar: { type: Number, default: 0 },
        sodio: { type: Number, default: 0 },
        zinc: { type: Number, default: 0 },
        humedad: { type: Number, default: 0 },
        cenizas: { type: Number, default: 0 },
        hdc: { type: Number, default: 0 },
        lipidos: { type: Number, default: 0 },
        acSaturados: { type: Number, default: 0 },
        acMonoinsaturados: { type: Number, default: 0 },
        acPoliinsaturados: { type: Number, default: 0 },
        colesterol: { type: Number, default: 0 },
        vitA: { type: Number, default: 0 },
        vitC: { type: Number, default: 0 },
        vitD: { type: Number, default: 0 },
        vitE: { type: Number, default: 0 },
        vitK: { type: Number, default: 0 },
        vitB1: { type: Number, default: 0 },
        vitB2: { type: Number, default: 0 },
        niacina: { type: Number, default: 0 },
        vitB6: { type: Number, default: 0 },
        ac: { type: Number, default: 0 },
        vitB12: { type: Number, default: 0 },
        Folatos: { type: Number, default: 0 },
        potasio: { type: Number, default: 0 },
        calcio: { type: Number, default: 0 },
        fosforo: { type: Number, default: 0 },
        magnesio: { type: Number, default: 0 },
        hierro: { type: Number, default: 0 },
        cobre: { type: Number, default: 0 },
        selenio: { type: Number, default: 0 },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

IngredientSchema.pre('save', async function (next) {
    if (this.isNew) {
        let nextId: number;

        const counter = await Counter.findByIdAndUpdate(
            'ingredientId',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        nextId = counter.seq;

        const exists = await mongoose.models.Ingredient.findOne({ id: nextId });

        if (exists) {
            const last = await mongoose.models.Ingredient.findOne().sort({ id: -1 });
            const lastId = last ? last.id : 0;

            await Counter.findByIdAndUpdate(
                'ingredientId',
                { seq: lastId },
                { new: true, upsert: true }
            );

            nextId = lastId + 1;
        }

        this.id = nextId;
    }
    next();
});
export const Ingredient = mongoose.model<IIngredient>('Ingredient', IngredientSchema);
