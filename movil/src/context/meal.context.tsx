import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllMeals, getMealById } from '../routes/meal.route';

type Meal = {
    _id: number;
    nombre: string;
    descripcion?: string;
    comidas?: any[];       // Foods pobladas
    asignadoA?: any[];
    asignadoPor?: any[];
    createdAt?: string;
    updatedAt?: string;
};

type MealContextType = {
    meals: Meal[];
    selectedMeal: Meal | null;
    loading: boolean;
    error: string | null;
    fetchMeals: () => Promise<void>;
    fetchMealById: (id: string) => Promise<void>;
    setSelectedMeal: (meal: Meal | null) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: ReactNode }) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMeals = async () => {
        try {
            setLoading(true);
            const data = await getAllMeals();
            const array = Array.isArray(data) ? data : data.data || [];
            setMeals(array);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Error al cargar meals');
        } finally {
            setLoading(false);
        }
    };

    const fetchMealById = async (id: string) => {
        try {
            setLoading(true);
            const res = await getMealById(id);
            console.log("response context meal | res:", res);
            const meal = res.data || res;
            console.log("response context meal | meal", meal);
            setSelectedMeal(meal);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Error al cargar meal');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <MealContext.Provider
            value={{ meals, selectedMeal, loading, error, fetchMeals, fetchMealById, setSelectedMeal }}
        >
            {children}
        </MealContext.Provider>
    );
};

export const useMeal = () => {
    const context = useContext(MealContext);
    if (!context) throw new Error('useMeal debe usarse dentro de MealProvider');
    return context;
};
