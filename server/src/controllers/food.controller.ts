import { Request, Response } from 'express';
import { FoodService } from '../services/food.service';

export class FoodController {
    static async create(req: Request, res: Response) {
        try {
            const { ingredientes } = req.body;
            if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length < 3) {
                return res.status(400).json({
                    error: 'Debes incluir al menos 3 ingredientes para crear una comida'
                });
            }

            const food = await FoodService.createFood(req.body);
            return res.status(201).json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const foods = await FoodService.getAllFoods();
            return res.json(foods);
        } catch {
            return res.status(500).json({ error: 'Error al obtener comidas' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const food = await FoodService.getFoodById(id.toString());
            return res.json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    
    }
    static async getByNumId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const food = await FoodService.getFoodByNumberId(id);
            return res.json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const food = await FoodService.updateFood(id, req.body);
            return res.json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async updateIngredients(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { ingredientes } = req.body;

            if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length < 1) {
                return res.status(400).json({
                    error: 'Debes enviar al menos 1 ingrediente para actualizar la comida'
                });
            }

            const food = await FoodService.updateIngredients(id, ingredientes);
            return res.json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async changeEstado(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { estado } = req.body;
            const food = await FoodService.changeEstado(id, estado);
            return res.json(food);
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const food = await FoodService.deleteFood(id);
            return res.json({ message: 'Comida eliminada (soft delete)', food });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
}
