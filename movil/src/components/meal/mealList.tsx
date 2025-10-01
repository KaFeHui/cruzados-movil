import React from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMeal } from '../../context/meal.context';
import MealCard from '../../components/meal/mealCard';

export default function MealsList() {
    const { meals, loading } = useMeal();
    const navigation = useNavigation<any>();

    if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                Meals
            </Text>
            {meals.map((meal) => (
                <MealCard
                    key={meal._id}
                    nombre={meal.nombre}
                    onPress={() => navigation.navigate('MealDetail', { id: meal._id })}
                />
            ))}
        </ScrollView>
    );
}
