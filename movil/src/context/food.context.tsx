import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createFood, getFoods } from '../routes/food.route';
import { createIngredient, getIngredients } from '../routes/ingredents.route';

type Food = {
  _id: string;
  id: number;
  nombre: string;
  meal: any
  porcion: number;
  horaEvento: string;
  estado: string;
  ingredientes: any[];
};

type FoodContextType = {
  foods: Food[];
  ingredientes: any[];
  loading: boolean;
  error: string | null;
  fetchFoods: () => Promise<void>;
  addFood: (data: Partial<Food>) => Promise<void>;
  fetchIngredientes: () => Promise<void>;
  addIngrediente: (data: Partial<any>) => Promise<void>;
  ingredientesSeleccionados: string[];
  setIngredientesSeleccionados: (ids: string[]) => void;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredientes, setIngredientes] = useState<any[]>([]);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<string[]>([]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await getFoods();
      setFoods(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar comidas');
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (data: Partial<Food>) => {
    try {
      setLoading(true);
      console.log("Datos para crear comida:", data);
      const newFood = await createFood(data);
      console.log("Comida creada:", newFood);
      setFoods((prev) => [...prev, newFood]);
    } catch (err: any) {
      setError(err.message || 'Error al crear comida');
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredientes = async () => {
    try {
      setLoading(true);
      const data = await getIngredients();
      console.log("Ingredientes que llegaron de la API:", data);
      const ingredientesArray = Array.isArray(data)
        ? data
        : data.ingredients || data.data || [];
      console.log("Ingredientes que voy a guardar en el context:", ingredientesArray);
      setIngredientes(ingredientesArray);
      setError(null);
    } catch (err: any) {
      console.error("Error en fetchIngredientes:", err);
      setError(err.message || 'Error al cargar ingredientes');
      setIngredientes([]);
    } finally {
      setLoading(false);
    }
  };


  const addIngrediente = async (data: Partial<any>) => {
    try {
      setLoading(true);
      const response = await createIngredient(data);
      const newIng = response.data || response;
      setIngredientes((prev) => [...prev, newIng]);
    } catch (err: any) {
      setError(err.message || 'Error al crear ingrediente');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <FoodContext.Provider value={{
      foods,
      ingredientes,
      loading,
      error,
      fetchFoods,
      addFood,
      addIngrediente,
      fetchIngredientes,
      ingredientesSeleccionados,
      setIngredientesSeleccionados
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) throw new Error('useFood debe usarse dentro de FoodProvider');
  return context;
};
