import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Text, TextInput, Platform } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import {
  Container,
  ContainerCreateAccount,
  ContainerLoginOrRegistry,
  ContainerLoginWithSocialMedia,
  ContainerLogo,
  GoogleButton,
  Logo,
  TextCreateAccount,
  TextOr,
} from './styles';
import logoImage from '../../assets/logo_catarina.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FacebookButton from './components/FacebookButton';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(() => {}, []);
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
          <ContainerCreateAccount>
            <TextCreateAccount>
              Ainda não tem uma conta? Crie uma aqui
            </TextCreateAccount>
            <TextOr>Ou</TextOr>
          </ContainerCreateAccount>
        </ContainerLoginOrRegistry>

        <ContainerLoginWithSocialMedia>
          <FacebookButton />
          <GoogleButton>
            <Text>G</Text>
          </GoogleButton>
        </ContainerLoginWithSocialMedia>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
