import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import themeGlobal from '../../../styles/global';

import {
  ButtonOk,
  Container,
  ContainerInfo,
  Icon,
  TextButton,
  TextDescription,
} from './styles';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IModalProps {
  setModalIsOpen: Dispatcher<boolean>;
}

const ModalCreateAccount: React.FC<IModalProps> = ({ setModalIsOpen }) => {
  const navigate = useNavigation();
  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    navigate.goBack();
  }, [navigate, setModalIsOpen]);

  return (
    <Container>
      <ContainerInfo>
        <Icon
          name="check-circle-outline"
          size={66}
          color={themeGlobal.colors.green}
        />
        <TextDescription>Cadastro realizado com sucesso!</TextDescription>
      </ContainerInfo>
      <ButtonOk onPress={handleCloseModal}>
        <TextButton>Voltar para o Login</TextButton>
      </ButtonOk>
    </Container>
  );
};

export default ModalCreateAccount;
