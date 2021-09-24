import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordCodeScreen from '../pages/ForgotPasswordCodeScreen';
import ForgotPasswordScreen from '../pages/ForgotPasswordScreen';
import NewPasswordScreen from '../pages/NewPasswordScreen';

const AppPasswordsRoutes = createStackNavigator();

const AppPasswords: React.FC = () => (
  <AppPasswordsRoutes.Navigator
    initialRouteName="ForgotPassword"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppPasswordsRoutes.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
    <AppPasswordsRoutes.Screen
      name="ForgotPasswordCode"
      component={ForgotPasswordCodeScreen}
    />
    <AppPasswordsRoutes.Screen
      name="NewPassword"
      component={NewPasswordScreen}
    />
  </AppPasswordsRoutes.Navigator>
);
export default AppPasswords;
