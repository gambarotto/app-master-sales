import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Routes from './routes';
import themeGlobal from './styles/global';
import { AuthProvider } from './contexts/auth';

const App: React.FC = () => (
  <NavigationContainer>
    <ThemeProvider theme={themeGlobal}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);

export default App;
