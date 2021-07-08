import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductScreen from '../pages/ProductScreen';
import AppTabsRoutes from './app.tabs.routes';

const AppMainRoutes = createStackNavigator();

const AppMain: React.FC = () => (
  <AppMainRoutes.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppMainRoutes.Screen name="Tabs" component={AppTabsRoutes} />
    <AppMainRoutes.Screen name="Product" component={ProductScreen} />
  </AppMainRoutes.Navigator>
);

export default AppMain;