/* eslint-disable global-require */
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { ActivityIndicator, View, LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './routes';
import themeGlobal from './styles/global';
import { AuthProvider } from './contexts/auth';
import { ProductProvider } from './contexts/products';
import { CartProvider } from './contexts/cart';

const App: React.FC = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
  });

  const client = new QueryClient();
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={themeGlobal.colors.secondary} size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <ThemeProvider theme={themeGlobal}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <Routes />
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
