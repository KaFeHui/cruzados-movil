import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/header';
import Home from './src/pages/home';
import Profile from './src/pages/profile/profile';
import ConfigurationScreen from './src/pages/config/configuration';
import { FoodProvider } from './src/context/food.context';
import FoodsStack from './src/components/food/foodStack';
import SlideBar from './src/components/slideBar';
import CreateFood from './src/components/food/createFood.component';
import MealStack from './src/components/meal/mealStack';
import { MealProvider } from './src/context/meal.context';

const Drawer = createDrawerNavigator();

function withHeader(Component: any) {
  return (props: any) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <Component {...props} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <FoodProvider>
        <MealProvider>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} drawerContent={() => <SlideBar />}>
              <Drawer.Screen name="Home" component={withHeader(Home)} />
              <Drawer.Screen name="Profile" component={withHeader(Profile)} />
              <Drawer.Screen name="Alimentos" component={FoodsStack} />
              <Drawer.Screen name="Comidas" component={MealStack} />
              <Drawer.Screen name="Ajustes" component={withHeader(ConfigurationScreen)} />
            </Drawer.Navigator>
          </NavigationContainer>
        </MealProvider>
      </FoodProvider>
    </SafeAreaProvider>
  );
}
