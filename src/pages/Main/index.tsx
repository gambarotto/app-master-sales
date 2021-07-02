import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const Main: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.name}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
