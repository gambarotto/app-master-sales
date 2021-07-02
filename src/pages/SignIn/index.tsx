import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';
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
import Input from '../../components/Input';
import Button from '../../components/Button';
import FacebookButton from '../../components/FacebookButton';
import { useAuth } from '../../contexts/auth';

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
        await signIn({ email, password });
      } catch (error) {
        console.log(error.message);
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
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              icon="email"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={inputPasswordRef}
              name="password"
              icon="lock"
              placeholder="Senha"
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
