import { IMeal, Meal } from "../models/meal.model";

export const createMeal = async (data: Partial<IMeal>): Promise<IMeal> => {
    if (!data.nombre) {
        throw { status: 400, message: 'Faltan campos obligatorios' };
    }
    const meal = new Meal(data);
    return await meal.save();
}

export const getAllMeals = async (): Promise<IMeal[]> => {
    return Meal.find();
}

export const getMealById = async (id: string): Promise<IMeal | null> => {
    const meal = await Meal.findById(id);
    if (!meal) throw { status: 404, message: 'Meal no encontrado' };
    return meal;
}

export const getMealByName = async (nombre: string): Promise<IMeal | null> => {
    const meal = await Meal.findOne({ nombre });
    if (!meal) throw { status: 404, message: 'Meal no encontrado' };
    return meal;
}