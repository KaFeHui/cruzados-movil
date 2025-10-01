import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: any
  Alimentos: any
  Comidas: any
};

const SlideBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40 }}>
      <TouchableOpacity
        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{ fontSize: 18 }}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Alimentos' }],
          })
        }
      >
        <Text style={{ fontSize: 18 }}>Alimentos</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SlideBar;
