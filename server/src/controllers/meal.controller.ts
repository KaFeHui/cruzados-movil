import { Request, Response } from "express";
import { createMeal, getAllMeals, getMealById } from "../services/meal.service";

export class MealController {
    static async create(req: Request, res: Response) {
        try {
            const meal = await createMeal(req.body);
            return res.status(201).json({ message: "Comida creada", data: meal });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const meals = await getAllMeals();
            return res.json({ message: "Comidas encontradas", data: meals });
        } catch {
            return res.status(500).json({ error: 'Error al obtener comidas' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const meal = await getMealById(id);
            return res.json({ message: "Comida encontrada", data: meal });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
}