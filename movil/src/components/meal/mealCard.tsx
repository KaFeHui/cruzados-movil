import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
    nombre: string;
    onPress: () => void;
};

export default function MealCard({ nombre, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 10,
                marginBottom: 15,
                backgroundColor: '#fff',
                padding: 20,
            }}
        >
            {/* almuerzo y cosa asi */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                {nombre}
            </Text>
        </TouchableOpacity>
    );
}
