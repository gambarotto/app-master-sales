import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import themeGlobal from '../styles/global';
import CartScreen from '../pages/CartScreen';
import CreateAddressScreen from '../pages/CreateAddressScreen';
import PaymentScreen from '../pages/PaymentScreen';
import ProductScreen from '../pages/ProductScreen';
import AppTabsRoutes from './app.tabs.routes';
import AdressesScreen from '../pages/AdressesScreen';

const AppMainRoutes = createStackNavigator();

const AppMain: React.FC = () => (
  <AppMainRoutes.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: themeGlobal.colors.white },
    }}
  >
    <AppMainRoutes.Screen name="Tabs" component={AppTabsRoutes} />
    <AppMainRoutes.Screen name="Product" component={ProductScreen} />
    <AppMainRoutes.Screen name="Cart" component={CartScreen} />
    <AppMainRoutes.Screen name="Payment" component={PaymentScreen} />
    <AppMainRoutes.Screen name="Adresses" component={AdressesScreen} />
    <AppMainRoutes.Screen
      name="CreateAddress"
      component={CreateAddressScreen}
    />
  </AppMainRoutes.Navigator>
);

export default AppMain;
