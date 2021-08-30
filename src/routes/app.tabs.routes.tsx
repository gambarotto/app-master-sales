import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../pages/HomeScreen';
import themeGlobal from '../styles/global';
import FavoriteScreen from '../pages/FavoriteScreen';
import OrdersScreen from '../pages/OrdersScreen';
import SettingsScreen from '../pages/SettingsScreen';

const App = createBottomTabNavigator();

const AppTabsRoutes: React.FC = () => (
  <App.Navigator
    initialRouteName="OrdersScreen"
    tabBarOptions={{
      activeTintColor: themeGlobal.colors.secondary,
      inactiveTintColor: themeGlobal.colors.gray,
    }}
  >
    <App.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <App.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="favorite" size={size} color={color} />
        ),
      }}
    />
    <App.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{
        tabBarLabel: 'Pedidos',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="receipt" size={size} color={color} />
        ),
      }}
    />
    <App.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Configurações',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={color} />
        ),
      }}
    />
  </App.Navigator>
);
export default AppTabsRoutes;
