import api from "../config/config";

export const getAllMeals = async () => {
    const res = await api.get('/api/meals');
    console.log("meals route:", res.data);
    return res.data;
}

export const getMealById = async (id: string) => {
    const res = await api.get(`/api/meals/${id}`);
    console.log("meal route por id:", res.data);
    return res.data;
}
