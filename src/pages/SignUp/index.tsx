import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import {
  Container,
  ContainerOr,
  ContainerLoginOrRegistry,
  ContainerLoginWithSocialMedia,
  ContainerLogo,
  Logo,
  TextOr,
} from './styles';
import logoImage from '../../assets/logo_catarina.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FacebookButton from '../../components/FacebookButton';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(() => {}, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <ContainerLogo>
            <Logo source={logoImage} />
          </ContainerLogo>
          <ContainerLoginOrRegistry>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="name-phone-pad"
                name="name"
                icon="account-circle"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputEmailRef.current?.focus();
                }}
              />
              <Input
                ref={inputEmailRef}
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
              color="secondary"
            >
              Criar Conta
            </Button>
            <ContainerOr>
              <TextOr>Ou</TextOr>
            </ContainerOr>
          </ContainerLoginOrRegistry>

          <ContainerLoginWithSocialMedia>
            <FacebookButton />
          </ContainerLoginWithSocialMedia>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
