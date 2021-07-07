import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/auth';
import AppMain from './app.main.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#ff9000" />
      </View>
    );
  }
  return user ? <AppMain /> : <AuthRoutes />;
};

export default Routes;
