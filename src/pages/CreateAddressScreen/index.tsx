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
import { useMutation, useQueryClient } from 'react-query';
import {
  Container,
  ContainerLogo,
  Logo,
  ContainerForm,
  TextVeryHappy,
  TextVeryHappy2,
  TextSkip,
  ContainerTextSkip,
} from './styles';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import ModalCreateAccount from './ModalCreateAddress';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../contexts/auth';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const CreateAddressScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputStreetRef = useRef<TextInput>(null);
  const inputNumberRef = useRef<TextInput>(null);
  const inputDistrictRef = useRef<TextInput>(null);
  const inputCityRef = useRef<TextInput>(null);
  const inputZipcodeRef = useRef<TextInput>(null);
  const inputComplementRef = useRef<TextInput>(null);
  const inputReferencePointRef = useRef<TextInput>(null);
  const inputAliasRef = useRef<TextInput>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigation = useNavigation();
  const { updateAdresses } = useAuth();

  const queryClient = useQueryClient();
  const addressMutation = useMutation(
    async (data: IFormData) => api.post('users/adresses/me', data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries('adresses');
        updateAdresses(response.data);
        setModalIsOpen(true);
      },
    },
  );

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    navigation.goBack();
  }, [navigation, setModalIsOpen]);

  const handleSignUp = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          street: Yup.string().required('Nome da rua obrigat??rio'),
          number: Yup.string().required('O numero ?? obrigat??rio'),
          district: Yup.string().required('O bairro ?? obrigat??rio'),
          city: Yup.string().required('A cidade ?? obrigat??ria'),
          zip_code: Yup.string().required('O cep ?? obrigat??rio'),
          complement: Yup.string(),
          reference_point: Yup.string(),
          alias: Yup.string().required('O apelido ?? obrigat??rio'),
        });
        await schema.validate(data, { abortEarly: false });
        addressMutation.mutate(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao efetuar o cadastro do endere??o, tente novamente.',
        );
      }
    },
    [addressMutation],
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
          <TextVeryHappy>
            Estamos muito felizes em ter voc?? aqui, por favor informe abaixo o
            seu endere??o.
          </TextVeryHappy>
          <TextVeryHappy2>
            Voc?? poder?? edita-lo ou adicionar mais endere??os posteriormente
          </TextVeryHappy2>
          <ContainerForm>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                ref={inputStreetRef}
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
                name="street"
                placeholder="Rua"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputNumberRef.current?.focus();
                }}
              />
              <Input
                ref={inputNumberRef}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                name="number"
                placeholder="n??"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputDistrictRef.current?.focus();
                }}
              />
              <Input
                ref={inputDistrictRef}
                name="district"
                placeholder="Bairro"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputCityRef.current?.focus();
                }}
              />
              <Input
                ref={inputCityRef}
                name="city"
                placeholder="Cidade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputZipcodeRef.current?.focus();
                }}
              />
              <Input
                ref={inputZipcodeRef}
                name="zip_code"
                placeholder="CEP"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputComplementRef.current?.focus();
                }}
              />
              <Input
                ref={inputComplementRef}
                name="complement"
                placeholder="Complemento"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputReferencePointRef.current?.focus();
                }}
              />
              <Input
                ref={inputReferencePointRef}
                name="reference_point"
                placeholder="Ponto de Referencia"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputAliasRef.current?.focus();
                }}
              />
              <Input
                ref={inputAliasRef}
                name="alias"
                placeholder="Apelido - ex: casa"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            <Button
              textSize={16}
              onPress={() => {
                formRef.current?.submitForm();
              }}
              color="secondary"
            >
              Cadastrar endere??o
            </Button>
          </ContainerForm>
          <ContainerTextSkip onPress={() => navigation.navigate('Tabs')}>
            <TextSkip>Cadastrar depois</TextSkip>
          </ContainerTextSkip>
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

export default CreateAddressScreen;
