import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import {
  Container,
  TextFirstStep,
  FlowButtonContainer,
  FlowTextButton,
  ContainerAlreadyHaveCode,
  TextAlreadyHaveCode,
  ContainerInputEmail,
  TextInputEmail,
} from './styles';

const ForgotPasswordScreen: React.FC = () => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState(user.email || '');
  const navigation = useNavigation();

  const sendEmailMutation = useMutation(
    async (email: string) => api.post('users/passwords/forgot', { email }),
    {
      onSuccess: () => navigation.navigate('ForgotPasswordCode'),
      // onError: (err) => console.log(err.response.data.message),
    },
  );
  const handleSendEmail = useCallback(() => {
    if (inputValue.length < 5) {
      return;
    }
    sendEmailMutation.mutate(inputValue);
  }, [inputValue, sendEmailMutation]);

  return (
    <Container>
      <TextFirstStep>
        Se você esqueceu sua senha, nos enviaremos um código para o e-mail
        abaixo se ele estiver cadastrado em nosso sistema
      </TextFirstStep>
      <ContainerInputEmail>
        <TextInputEmail
          autoCompleteType="email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Seu e-mail"
          defaultValue={user.email || undefined}
          onChangeText={(text) => setInputValue(text)}
        />
      </ContainerInputEmail>
      <FlowButtonContainer
        onPress={handleSendEmail}
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
        <FlowTextButton>Enviar e-mail</FlowTextButton>
      </FlowButtonContainer>
      <ContainerAlreadyHaveCode
        onPress={() => navigation.navigate('ForgotPasswordCode')}
      >
        <TextAlreadyHaveCode>Já tem um código?</TextAlreadyHaveCode>
      </ContainerAlreadyHaveCode>
    </Container>
  );
};

export default ForgotPasswordScreen;
