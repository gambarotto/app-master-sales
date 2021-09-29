import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useMutation } from 'react-query';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import themeGlobal from '../../styles/global';

import {
  Container,
  TextFirstStep,
  FlowButtonContainer,
  FlowTextButton,
  ContainerAlreadyHaveCode,
  TextAlreadyHaveCode,
  ContainerInputEmail,
  TextInputEmail,
  TextSendingEmail,
  IndicatorSendEmail,
} from './styles';

interface IError {
  response: {
    data: {
      message: string;
    };
  };
}
const ForgotPasswordScreen: React.FC = () => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState(user.email || '');
  const navigation = useNavigation();

  const translateY = useSharedValue(0);
  const animateStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateY.value),
  }));
  const sendEmailMutation = useMutation(
    async (email: string) => api.post('users/passwords/forgot', { email }),
    {
      onSuccess: () => navigation.navigate('ForgotPasswordCode'),
      onError: (err: IError) => console.log(err.response.data.message),
    },
  );
  useEffect(() => {
    if (sendEmailMutation.isLoading) {
      translateY.value = 1;
    } else {
      translateY.value = 0;
    }
  }, [sendEmailMutation.isLoading, translateY]);

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

      {sendEmailMutation.isLoading && (
        <>
          <IndicatorSendEmail color={themeGlobal.colors.tertiary} size={24} />
          <TextSendingEmail style={animateStyle}>
            Estamos enviando o email...
          </TextSendingEmail>
        </>
      )}

      <FlowButtonContainer
        enabled={!sendEmailMutation.isLoading}
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
        <FlowTextButton>
          {sendEmailMutation.isLoading ? 'Aguarde...' : 'Enviar e-mail'}
        </FlowTextButton>
      </FlowButtonContainer>
      <ContainerAlreadyHaveCode
        onPress={() => navigation.navigate('ForgotPasswordCode')}
        disabled={sendEmailMutation.isLoading}
      >
        <TextAlreadyHaveCode>Já tem um código?</TextAlreadyHaveCode>
      </ContainerAlreadyHaveCode>
    </Container>
  );
};

export default ForgotPasswordScreen;
