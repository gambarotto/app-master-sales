import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, TextInput } from 'react-native';
import Button from '../../components/Button';
import IconBack from '../../components/IconBack';
import Input from '../../components/Input';
import { IUser } from '../../contexts/auth';
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
} from './styles';

const EditProfileScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const [keybordShow, setKeyboardShow] = useState(false);

  const navigation = useNavigation();
  const { data: user } = useFetch<IUser>('users/profiles/me');

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

  // TODO Antes de alterar email, verificar login com facebook
  const handleEditProfile = useCallback(() => {}, []);
  return (
    <KeyboardAvoiding
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Container>
        <IconBack onPress={() => navigation.goBack()} />
        <ContainerAvatar>
          <ContainerAvatarImage>
            {user?.avatar_url && <Avatar source={{ uri: user?.avatar_url }} />}
          </ContainerAvatarImage>
          <ButtonCamera>
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
        </ContainerForm>
      </Container>
      {!keybordShow && (
        <ContainerActionsButtons>
          <ContainerChangePassword>
            <TextChangePassword>
              Gostaria de trocar sua senha? clique aqui
            </TextChangePassword>
          </ContainerChangePassword>
          <Button textSize={16} color="secondary">
            Atualizar
          </Button>
        </ContainerActionsButtons>
      )}
    </KeyboardAvoiding>
  );
};

export default EditProfileScreen;
