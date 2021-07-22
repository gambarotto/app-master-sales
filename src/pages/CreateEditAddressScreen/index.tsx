import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput, Platform, Alert, Keyboard } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import {
  Container,
  ContainerForm,
  ContainerHeader,
  ButtonBack,
  Icon,
  TitleAdresses,
  ContainerDoubleInputs,
  KeyboardAvoiding,
  ContainerButtons,
  DeleteAddressButton,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import ModalCreateAccount from './ModalCreateAddress';
import getValidationErrors from '../../utils/getValidationErrors';
import themeGlobal from '../../styles/global';
import { IAddress } from '../../contexts/auth';
import ModalDeleteteAddress from './ModalDeleteAddress';
import InputMask from '../../components/InputMask';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const CreateEditAddressScreen: React.FC = () => {
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
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [keybordShow, setKeyboardShow] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const routeAddress = route.params as IAddress;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);
  const keyboardDidShow = (): void => setKeyboardShow(true);
  const keyboardDidHide = (): void => setKeyboardShow(false);

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    navigation.goBack();
  }, [navigation, setModalIsOpen]);
  const handleCloseDeleteModal = useCallback(() => {
    setModalDeleteIsOpen(false);
    navigation.goBack();
  }, [navigation]);

  const handleCreateAddress = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          street: Yup.string().required('Nome da rua obrigatório'),
          number: Yup.string().required('O numero é obrigatório'),
          district: Yup.string().required('O bairro é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória'),
          zip_code: Yup.string().required('O cep é obrigatório'),
          complement: Yup.string(),
          reference_point: Yup.string(),
          alias: Yup.string().required('O apelido é obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });

        if (routeAddress) {
          await api.put(`users/adresses/me/${routeAddress.id}`, data);
        } else {
          await api.post('users/adresses/me', data);
        }

        setModalIsOpen(true);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao efetuar o cadastro do endereço, tente novamente.',
        );
      }
    },
    [routeAddress],
  );
  const changeTitle = useMemo(
    () => (routeAddress ? 'Editar Endereço' : 'Novo Endereço'),
    [routeAddress],
  );
  return (
    <KeyboardAvoiding
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Container>
        <ContainerHeader>
          <ButtonBack onPress={() => navigation.navigate('Adresses')}>
            <Icon
              name="keyboard-arrow-left"
              size={24}
              color={themeGlobal.colors.secondary}
            />
          </ButtonBack>
          <TitleAdresses>{changeTitle}</TitleAdresses>
        </ContainerHeader>
        <ContainerForm>
          <Form ref={formRef} onSubmit={handleCreateAddress}>
            <Input
              ref={inputStreetRef}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              name="street"
              label="Rua"
              defaultValue={routeAddress ? routeAddress.street : undefined}
              initialValue={routeAddress ? routeAddress.street : undefined}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputNumberRef.current?.focus();
              }}
            />
            <ContainerDoubleInputs>
              <Input
                ref={inputNumberRef}
                style={{ maxWidth: '30%', marginRight: 8 }}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                name="number"
                label="N°"
                defaultValue={routeAddress ? routeAddress.number : undefined}
                initialValue={routeAddress ? routeAddress.number : undefined}
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputDistrictRef.current?.focus();
                }}
              />
              <Input
                ref={inputDistrictRef}
                name="district"
                label="Bairro"
                defaultValue={routeAddress ? routeAddress.district : undefined}
                initialValue={routeAddress ? routeAddress.district : undefined}
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputCityRef.current?.focus();
                }}
              />
            </ContainerDoubleInputs>
            <ContainerDoubleInputs>
              <Input
                ref={inputCityRef}
                style={{ marginRight: 8 }}
                name="city"
                label="Cidade"
                defaultValue={routeAddress ? routeAddress.city : undefined}
                initialValue={routeAddress ? routeAddress.city : undefined}
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputZipcodeRef.current?.focus();
                }}
              />
              <InputMask
                ref={inputZipcodeRef}
                style={{ maxWidth: '40%' }}
                type="zip-code"
                name="zip_code"
                label="CEP"
                defaultValue={routeAddress ? routeAddress.zip_code : undefined}
                initialValue={routeAddress ? routeAddress.zip_code : undefined}
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputComplementRef.current?.focus();
                }}
              />
            </ContainerDoubleInputs>
            <Input
              ref={inputComplementRef}
              name="complement"
              label="Complemento"
              defaultValue={routeAddress ? routeAddress.complement : undefined}
              initialValue={routeAddress ? routeAddress.complement : undefined}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputReferencePointRef.current?.focus();
              }}
            />
            <Input
              ref={inputReferencePointRef}
              name="reference_point"
              label="Ponto de Referencia"
              defaultValue={
                routeAddress ? routeAddress.reference_point : undefined
              }
              initialValue={
                routeAddress ? routeAddress.reference_point : undefined
              }
              returnKeyType="next"
              onSubmitEditing={() => {
                inputAliasRef.current?.focus();
              }}
            />
            <Input
              ref={inputAliasRef}
              name="alias"
              label="Apelido - ex: casa"
              defaultValue={routeAddress ? routeAddress.alias : undefined}
              initialValue={routeAddress ? routeAddress.alias : undefined}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </ContainerForm>
        <Modal
          isVisible={modalIsOpen}
          onBackButtonPress={handleCloseModal}
          onBackdropPress={handleCloseModal}
          useNativeDriver
        >
          <ModalCreateAccount setModalIsOpen={setModalIsOpen} />
        </Modal>
        <Modal
          isVisible={modalDeleteIsOpen}
          onBackButtonPress={handleCloseDeleteModal}
          onBackdropPress={handleCloseDeleteModal}
          useNativeDriver
        >
          <ModalDeleteteAddress
            addressId={routeAddress && routeAddress.id}
            setModalIsOpen={setModalDeleteIsOpen}
          />
        </Modal>
      </Container>
      {!keybordShow && (
        <ContainerButtons>
          {routeAddress && (
            <DeleteAddressButton onPress={() => setModalDeleteIsOpen(true)}>
              <Icon name="delete" size={24} color={themeGlobal.colors.white} />
            </DeleteAddressButton>
          )}
          <Button
            textSize={16}
            onPress={() => {
              formRef.current?.submitForm();
            }}
            color="secondary"
          >
            {routeAddress ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </ContainerButtons>
      )}
    </KeyboardAvoiding>
  );
};

export default CreateEditAddressScreen;
