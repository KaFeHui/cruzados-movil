import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../context/food.context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { serverUrl } from '../../config/env';

export default function CreateFood() {
    const { addFood, ingredientesSeleccionados, ingredientes } = useFood();
    const navigation = useNavigation<any>();

    const [meal, setMeal] = useState('a');
    const [nombre, setNombre] = useState('');
    const [porcion, setPorcion] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [estado, setEstado] = useState('Pendiente'); // valor seleccionado
    const [estados, setEstados] = useState([  // lista de opciones
        { nombre: 'Pendiente' },
        { nombre: 'Programado' },
        { nombre: 'Realizado' },
        { nombre: 'Omitido' },
    ]);
    const [meals, setMeals] = useState<any[]>([]);

    const seleccionados = (ingredientes || []).filter(ing => {
        if (!ing?._id) {
            console.warn("Ingrediente inválido:", ing);
            return false;
        }
        return ingredientesSeleccionados.includes(ing._id);
    });

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/meals`);
                console.log("Meals API:", res.data);

                const mealsData = Array.isArray(res.data) ? res.data : res.data.data || [];
                setMeals(mealsData);
            } catch (err) {
                console.error('Error al cargar meals', err);
                setMeals([]);
            }
        };
        fetchMeals();
    }, []);

    const handleSubmit = async () => {
        if (!nombre || !meal || !porcion || !horaEvento) {
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }

        try {
            await addFood({
                nombre,
                meal,
                porcion: Number(porcion),
                horaEvento,
                estado,
                ingredientes: ingredientesSeleccionados
            });

            Alert.alert('Éxito', 'Comida creada correctamente');
            navigation.navigate('FoodsList');
        } catch (err: any) {
            Alert.alert('Error', err.message || 'No se pudo crear la comida');
        }
    };

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                Crear nueva comida
            </Text>
            <Text>nombre</Text>
            <TextInput
                placeholder="ej: arroz con pollo..."
                value={nombre}
                onChangeText={setNombre}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Tipo</Text>
            <Picker
                selectedValue={meal}
                onValueChange={(itemValue) => setMeal(itemValue)}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    marginBottom: 15,
                    width: '100%',
                    height: 50,
                    backgroundColor: '#fff',
                }}
            >
                <Picker.Item label="Seleccionar tipo de comida..." value="" />
                {meals.map((m) => (
                    <Picker.Item key={m._id} label={m.nombre} value={m._id} />
                ))}
            </Picker>

            <Text style={{ fontWeight: 'bold' }}>Porción</Text>
            <TextInput
                placeholder="Ej: 2"
                value={porcion}
                onChangeText={setPorcion}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Hora de evento</Text>
            <TextInput
                placeholder="Ej: 13:00"
                value={horaEvento}
                onChangeText={setHoraEvento}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Estado</Text>
            <Picker
                selectedValue={estado}
                onValueChange={(itemValue) => setEstado(itemValue)}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    marginBottom: 15,
                    width: '100%',
                    height: 50,
                    backgroundColor: '#fff',
                }}
            >
                <Picker.Item label="Seleccionar estado" value="" />
                {estados.map((m) => (
                    <Picker.Item label={m.nombre} />
                ))}
            </Picker>
            {seleccionados.length > 0 && (
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Ingredientes seleccionados:</Text>
                    {seleccionados.map((ing) => (
                        <View
                            key={ing._id}
                            style={{
                                padding: 10,
                                marginBottom: 5,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 8,
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{ing.nombre}</Text>
                            <Text>
                                {ing.cantidad} {ing.tipoPeso}
                            </Text>
                        </View>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={{
                    backgroundColor: ingredientesSeleccionados.length > 0 ? 'blue' : 'green',
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginBottom: 20,
                }}
                onPress={() => navigation.navigate('IngredientesList')}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {ingredientesSeleccionados.length > 0
                        ? 'Modificar ingredientes'
                        : 'Agregar ingredientes'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: '#007AFF',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar comida</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
