import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
  Container,
  ContainerCreateAccount,
  ContainerLoginOrRegistry,
  ContainerLoginWithSocialMedia,
  ContainerLogo,
  Logo,
  TextCreateAccount,
  TextOr,
} from './styles';
import logoImage from '../../assets/logo_catarina.png';
import Button from '../../components/Button';
import FacebookButton from '../../components/FacebookButton';
import { useAuth } from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import InputRounded from '../../components/InputRounded';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async ({ email, password }: IFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Informe um email válido')
            .required('E-mail é obrigatório'),
          password: Yup.string()
            .required()
            .min(6, 'A senha deve conter no mínimo 6 caractéres'),
        });
        await schema.validate({ email, password }, { abortEarly: false });
        await signIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no login',
          'Ocorreu um erro ao efetuar o login, tente novamente.',
        );
      }
    },
    [signIn],
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <ContainerLogo>
          <Logo source={logoImage} />
        </ContainerLogo>
        <ContainerLoginOrRegistry>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <InputRounded
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              labelPlaceholder="E-mail"
              name="email"
              icon="email"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputPasswordRef.current?.focus();
              }}
            />
            <InputRounded
              ref={inputPasswordRef}
              name="password"
              labelPlaceholder="Senha"
              icon="lock"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
            color="tertiary"
          >
            Login
          </Button>
          <ContainerCreateAccount onPress={() => navigation.navigate('SignUp')}>
            <TextCreateAccount>
              Ainda não tem uma conta? Crie uma aqui
            </TextCreateAccount>
            <TextOr>Ou</TextOr>
          </ContainerCreateAccount>
        </ContainerLoginOrRegistry>

        <ContainerLoginWithSocialMedia>
          <FacebookButton />
        </ContainerLoginWithSocialMedia>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
