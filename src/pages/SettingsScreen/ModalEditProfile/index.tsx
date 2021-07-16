import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

import Button from '../../../components/Button';
import InputRounded from '../../../components/InputRounded';

import {
  ButtonBack,
  Container,
  ContainerBody,
  ContainerButtons,
  ContainerHeader,
  ContainerTextChangePassword,
  TextButton,
  TextChangePassword,
  TextHeader,
} from './styles';

interface IModalProps {
  setModalIsOpen(): void;
}

const ModalEditProfile: React.FC<IModalProps> = ({ setModalIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const handleCloseModal = useCallback(() => {
    setModalIsOpen();
  }, [setModalIsOpen]);

  return (
    <Container>
      <ContainerHeader>
        <TextHeader>Editar Perfil</TextHeader>
      </ContainerHeader>
      <ContainerBody>
        <Form ref={formRef} onSubmit={() => {}}>
          <InputRounded
            ref={nameInputRef}
            name="name"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />
          <InputRounded
            ref={emailInputRef}
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="visible-password"
            secureTextEntry
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
        <ContainerTextChangePassword>
          <TextChangePassword>
            Gostaria de mudar sua senha?, clique aqui
          </TextChangePassword>
        </ContainerTextChangePassword>
        <ContainerButtons>
          <ButtonBack onPress={setModalIsOpen}>
            <TextButton>Voltar</TextButton>
          </ButtonBack>
          <Button onPress={handleCloseModal} color="tertiary" textSize={16}>
            Alterar
          </Button>
        </ContainerButtons>
      </ContainerBody>
    </Container>
  );
};

export default ModalEditProfile;
/**
 *           style={}
 */
