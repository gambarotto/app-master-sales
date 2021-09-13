import React from 'react';
import LoadingContent from '../components/LoadingContent';
import { useAuth } from '../contexts/auth';
import AppMain from './app.main.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingContent />;
  }
  return user ? <AppMain /> : <AuthRoutes />;
};

export default Routes;
