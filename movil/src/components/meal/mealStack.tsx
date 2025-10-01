import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import withHeader from '../withHeader';
import MealsList from './mealList';
import MealDetail from './mealDetail';
import FoodDetail from '../food/foodDetail';
import Foods from '../../pages/food/food';
const Stack = createNativeStackNavigator();

export default function MealStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MealsList" component={withHeader(MealsList)} />
            <Stack.Screen name="MealDetail" component={withHeader(MealDetail)} />

            <Stack.Screen name="FoodsList" component={withHeader(Foods)} />
            <Stack.Screen name="FoodDetail" component={withHeader(FoodDetail)} />
        </Stack.Navigator>
    );
}
