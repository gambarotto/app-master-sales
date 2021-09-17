import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import { useMutation } from 'react-query';
import {
  Container,
  ContainerOr,
  ContainerLoginWithSocialMedia,
  ContainerLogo,
  Logo,
  TextOr,
  ContainerTextBack,
  TextBack,
  ContainerForm,
} from './styles';
import logoImage from '../../assets/logo_catarina.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FacebookButton from '../../components/FacebookButton';
import api from '../../services/api';
import ModalCreateAccount from './ModalCreateAccount';
import getValidationErrors from '../../utils/getValidationErrors';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigation();

  const userMutation = useMutation(
    async (data: IFormData) => api.post('users', data),
    {
      onSuccess: () => {
        setModalIsOpen(true);
      },
    },
  );

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    navigate.goBack();
  }, [navigate, setModalIsOpen]);

  const handleSignUp = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Informe um email válido'),
          password: Yup.string().min(
            6,
            'A senha deve conter no minimo 6 caractéres',
          ),
        });
        await schema.validate(data, { abortEarly: false });
        userMutation.mutate(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao efetuar o cadastro, tente novamente.',
        );
      }
    },
    [userMutation],
  );

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
          <ContainerForm>
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
              styleContainer={{ marginTop: 8 }}
              color="secondary"
              textSize={18}
            >
              Criar Conta
            </Button>
            <ContainerOr>
              <TextOr>Ou</TextOr>
            </ContainerOr>
          </ContainerForm>

          <ContainerLoginWithSocialMedia>
            <FacebookButton />
          </ContainerLoginWithSocialMedia>
          <ContainerTextBack onPress={() => navigate.goBack()}>
            <TextBack>Já tem uma conta? clique aqui</TextBack>
          </ContainerTextBack>
          <Modal
            isVisible={modalIsOpen}
            onBackButtonPress={handleCloseModal}
            onBackdropPress={handleCloseModal}
            useNativeDriver
          >
            <ModalCreateAccount setModalIsOpen={setModalIsOpen} />
          </Modal>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
