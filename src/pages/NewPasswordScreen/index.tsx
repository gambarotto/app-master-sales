import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import {
  ConfirmButtonContainer,
  ConfirmTextButton,
  Container,
  ContainerInputPassword,
  TextInputPassword,
  TextInsertPassword,
} from './styles';

interface IData {
  password: string;
  verification_code: number;
}
interface IRouteParams {
  verification_code: number;
}
const NewPasswordScreen: React.FC = () => {
  const { signOut, user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { verification_code } = route.params as IRouteParams;

  const passwordMutation = useMutation(
    async (data: IData) => api.post('users/passwords/reset', data),
    {
      onSuccess: () => {
        if (user) {
          signOut();
          return;
        }
        navigation.navigate('SignIn');
      },
    },
  );

  const handleConfirmCode = useCallback(() => {
    const data = {
      verification_code,
      password: inputValue,
    };
    passwordMutation.mutate(data);
  }, [inputValue, passwordMutation, verification_code]);
  return (
    <Container>
      <TextInsertPassword>Insira sua nova senha</TextInsertPassword>
      <ContainerInputPassword>
        <TextInputPassword
          placeholder="******"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          onChangeText={(text) => setInputValue(text)}
        />
      </ContainerInputPassword>
      <ConfirmButtonContainer
        onPress={handleConfirmCode}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 50,
            height: 20,
          },
          shadowOpacity: 0,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <ConfirmTextButton>Confirmar</ConfirmTextButton>
      </ConfirmButtonContainer>
    </Container>
  );
};

export default NewPasswordScreen;
