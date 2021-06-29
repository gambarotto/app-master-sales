import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Routes from './routes';
import themeGlobal from './styles/global';

const App: React.FC = () => (
  <NavigationContainer>
    <ThemeProvider theme={themeGlobal}>
      <Routes />
    </ThemeProvider>
  </NavigationContainer>
);

export default App;
