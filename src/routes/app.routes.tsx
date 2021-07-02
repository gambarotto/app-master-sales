import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../pages/Main';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <App.Screen name="Main" component={Main} />
  </App.Navigator>
);
export default AppRoutes;
