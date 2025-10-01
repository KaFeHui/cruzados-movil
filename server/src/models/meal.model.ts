import mongoose, { Schema } from "mongoose";

export interface IMeal extends Document {
  _id?: mongoose.Types.ObjectId;
  nombre: string;        // Ej: "Desayuno", "Almuerzo", "Cena", "Colación"
  descripcion?: string;  // Texto opcional
  comidas?: mongoose.Types.ObjectId[];
  asignadoPor?: mongoose.Types.ObjectId[]; // deberia haber 2 usuarios, nutri y paciente.
  asignadoA?: mongoose.Types.ObjectId[]; // deberia haber 2 usuarios, nutri y paciente.
}

const MealSchema = new Schema<IMeal>(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    descripcion: { type: String, trim: true },
    comidas: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    asignadoPor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    asignadoA: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
export const Meal = mongoose.model<IMeal>('Meal', MealSchema);