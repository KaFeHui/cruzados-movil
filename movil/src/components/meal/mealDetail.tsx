import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useMeal } from '../../context/meal.context';

export default function MealDetail({ route }: any) {
  const { id } = route.params;
  const { selectedMeal, loading, fetchMealById } = useMeal();

  useEffect(() => {
    fetchMealById(id);
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (!selectedMeal) return <Text>Error al cargar meal</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
        {selectedMeal.nombre}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Comidas:</Text>
      {selectedMeal.comidas && selectedMeal.comidas.length > 0 ? (
        selectedMeal.comidas.map((food: any) => (
          <View
            key={food._id}
            style={{
              padding: 10,
              marginBottom: 8,
              borderRadius: 8,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{food.nombre}</Text>
            <Text>Hora: {food.horaEvento}</Text>
            <Text>Estado: {food.estado}</Text>
          </View>
        ))
      ) : (
        <Text>No hay comidas registradas para este meal.</Text>
      )}
    </ScrollView>
  );
}
