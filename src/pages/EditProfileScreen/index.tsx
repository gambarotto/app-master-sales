import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, Keyboard, Platform, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import mime from 'mime';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import IconBack from '../../components/IconBack';
import Input from '../../components/Input';
import { IUser, useAuth } from '../../contexts/auth';
import { useFetch } from '../../hooks/useFetch';
import themeGlobal from '../../styles/global';

import {
  Avatar,
  ButtonCamera,
  Container,
  ContainerActionsButtons,
  ContainerAvatar,
  ContainerAvatarImage,
  ContainerChangePassword,
  ContainerForm,
  IconCamera,
  KeyboardAvoiding,
  TextChangePassword,
  TextFbLoginEmail,
} from './styles';
import ModalProfileUpdate from './ModalProfileUpdate';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface ImagePickerCrop {
  uri: string;
  width?: number;
  height?: number;
  type?: string | null;
  name: string | undefined;
}
interface UpdateProfile {
  name: string;
  email: string;
}

const EditProfileScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputEmailRef = useRef<TextInput>(null);

  const [keybordShow, setKeyboardShow] = useState(false);
  const [avatarImage, setAvatarImage] = useState<ImagePickerCrop>();
  const [fbLogin, setFbLogin] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const { data: user } = useFetch<IUser>('users/profiles/me');
  const navigation = useNavigation();
  const { updateUser } = useAuth();

  useEffect(() => {
    async function verifyIfLoginFb(): Promise<void> {
      const isFbLogin = await AsyncStorage.getItem('AppSales:facebook');
      if (isFbLogin) {
        setFbLogin(JSON.parse(isFbLogin));
      }
    }
    verifyIfLoginFb();

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);
  const keyboardDidShow = (): void => setKeyboardShow(true);
  const keyboardDidHide = (): void => setKeyboardShow(false);

  const handleEditProfile = useCallback(
    async (data: UpdateProfile) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('OEmail é obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });
        if (avatarImage) {
          const formData = new FormData();
          formData.append('avatar', avatarImage);

          await api.patch('users/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        const response = await api.put('users/profiles/me', data);
        await updateUser(response.data);

        setOpenModalSuccess(true);
        setOpenModal(true);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        setOpenModalSuccess(false);
        setOpenModal(true);
      }
    },
    [avatarImage, updateUser],
  );
  const handleCamera = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const nameImage = pickerResult.uri.split('/').pop();

    setAvatarImage({
      uri: pickerResult.uri,
      name: nameImage,
      width: pickerResult.width,
      height: pickerResult.height,
      type: mime.getType(pickerResult.uri),
    });
  }, []);
  const changeAvatar = useMemo(
    () => avatarImage?.uri || user?.avatar_url,
    [avatarImage, user?.avatar_url],
  );
  return (
    <KeyboardAvoiding
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Container>
        <IconBack onPress={() => navigation.goBack()} />
        <ContainerAvatar>
          <ContainerAvatarImage>
            <Avatar source={{ uri: changeAvatar }} />
          </ContainerAvatarImage>
          <ButtonCamera onPress={handleCamera}>
            <IconCamera
              name="photo-camera"
              size={28}
              color={themeGlobal.colors.white}
            />
          </ButtonCamera>
        </ContainerAvatar>
        <ContainerForm>
          <Form ref={formRef} onSubmit={handleEditProfile}>
            <Input
              ref={inputNameRef}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              name="name"
              label="Nome"
              defaultValue={user?.name}
              initialValue={user?.name}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputEmailRef.current?.focus();
              }}
            />
            <Input
              ref={inputEmailRef}
              editable={!fbLogin}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              name="email"
              label="E-mail"
              defaultValue={user?.email}
              initialValue={user?.email}
              returnKeyType="next"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
          {fbLogin && (
            <TextFbLoginEmail>
              Não é possível alterar o email se você fez login pelo facebook
            </TextFbLoginEmail>
          )}
        </ContainerForm>
      </Container>
      {!keybordShow && (
        <ContainerActionsButtons>
          <ContainerChangePassword>
            <TextChangePassword>
              Gostaria de trocar sua senha? clique aqui
            </TextChangePassword>
          </ContainerChangePassword>
          <Button
            textSize={16}
            color="secondary"
            onPress={() => formRef.current?.submitForm()}
          >
            Atualizar
          </Button>
        </ContainerActionsButtons>
      )}
      <Modal isVisible={openModal}>
        <ModalProfileUpdate
          setModalIsOpen={setOpenModal}
          success={openModalSuccess}
        />
      </Modal>
    </KeyboardAvoiding>
  );
};

export default EditProfileScreen;
