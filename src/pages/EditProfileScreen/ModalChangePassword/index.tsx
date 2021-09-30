/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Alert, TextInput, Modal } from 'react-native';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { motify } from 'moti';
import Input from '../../../components/Input';
import {
  ActionButton,
  Container,
  ContainerForgotPassword,
  ContainerInputs,
  ContainerKeyboarding,
  TextActionButton,
  TextForgotPassword,
  TitleModal,
} from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import ModalAlert from '../../../components/ModalAlert';
import themeGlobal from '../../../styles/global';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface Props {
  setIsVisible: Dispatcher<boolean>;
}
interface IDataForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
interface ModalState {
  actionFunc: (data?: any) => void;
  message?: string;
  icon?: {
    name: string;
    color?: string;
    size?: number;
  };
}
interface IAxiosError {
  response: {
    data: {
      message: string;
    };
  };
}
const ModalChangePassword: React.FC<Props> = ({ setIsVisible }) => {
  const formRef = useRef<FormHandles>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState<ModalState>({
    actionFunc: () => {},
  });

  const handleCloseModal = useCallback(() => {
    setShowModal((state) => !state);
  }, []);
  const handleSuccessModal = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const passwordMutation = useMutation(
    async (data: IDataForm) =>
      api.put('users/profiles/me', {
        old_password: data.old_password,
        new_password: data.new_password,
      }),
    {
      onSuccess: () => {
        setActionModal({
          actionFunc: handleSuccessModal,
          icon: {
            name: 'check-circle',
            color: themeGlobal.colors.green,
          },
          message: 'Senha alterada com sucesso',
        });
        setShowModal((state) => !state);
      },
      onError: (err: IAxiosError) => {
        setActionModal({
          message: err.response.data.message,
          actionFunc: handleCloseModal,
        });
        setShowModal((state) => !state);
      },
    },
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('Passwords');
  }, [navigation]);
  const handleSubmit = useCallback(
    async (data: IDataForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          old_password: Yup.string().required('Digite sua senha'),
          new_password: Yup.string()
            .min(6, 'A senha deve conter no minimo 6 caractéres')
            .required('Digite sua nova senha'),
          confirm_password: Yup.mixed().test(
            'match',
            'As senhas não conferem',
            function () {
              return this.parent.new_password === this.parent.confirm_password;
            },
          ),
        });

        await schema.validate(data, { abortEarly: false });
        passwordMutation.mutate(data);
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
    [passwordMutation],
  );

  return (
    <Container
      from={{ translateY: 10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 500,
        opacity: {
          type: 'timing',
          duration: 300,
        },
      }}
      exit={{
        translateY: 10,
        opacity: 0,
      }}
      exitTransition={{ type: 'timing' }}
    >
      <ContainerKeyboarding>
        <TitleModal>Trocar senha</TitleModal>
        <ContainerInputs>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              ref={oldPasswordRef}
              selectedColor="tertiary"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={newPasswordRef}
              secureTextEntry
              selectedColor="tertiary"
              autoCapitalize="none"
              autoCorrect={false}
              name="new_password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={confirmPasswordRef}
              secureTextEntry
              selectedColor="tertiary"
              autoCapitalize="none"
              autoCorrect={false}
              name="confirm_password"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </ContainerInputs>
        <ContainerForgotPassword onPress={handleForgotPassword}>
          <TextForgotPassword>Esqueceu a senha?</TextForgotPassword>
        </ContainerForgotPassword>
        <ActionButton
          confirmedButton
          onPress={() => formRef.current?.submitForm()}
        >
          <TextActionButton confirmedButton>Trocar</TextActionButton>
        </ActionButton>
        <ActionButton onPress={handleClose} confirmedButton={false}>
          <TextActionButton confirmedButton={false}>Cancelar</TextActionButton>
        </ActionButton>

        <Modal
          visible={showModal}
          transparent
          onRequestClose={actionModal.actionFunc}
        >
          <ModalAlert
            actionFunc={actionModal.actionFunc}
            icon={actionModal.icon}
            message={actionModal.message}
          />
        </Modal>
      </ContainerKeyboarding>
    </Container>
  );
};

export default ModalChangePassword;
