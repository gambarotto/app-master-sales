import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import api from '../../../services/api';
import themeGlobal from '../../../styles/global';

import {
  Button,
  Container,
  ContainerButtons,
  ContainerInfo,
  Icon,
  TextButton,
  TextDescription,
} from './styles';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IModalProps {
  setModalIsOpen: Dispatcher<boolean>;
  addressId: string;
}

const ModalDeleteteAddress: React.FC<IModalProps> = ({
  setModalIsOpen,
  addressId,
}) => {
  const navigation = useNavigation();

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    navigation.navigate('Adresses');
  }, [navigation, setModalIsOpen]);

  const handleYesButton = useCallback(async () => {
    await api.delete(`/users/adresses/me/${addressId}`);
    handleCloseModal();
  }, [addressId, handleCloseModal]);

  return (
    <Container>
      <ContainerInfo>
        <Icon name="error" size={66} color={themeGlobal.colors.red} />
        <TextDescription>Deseja realmente excluir o endereço?</TextDescription>
      </ContainerInfo>
      <ContainerButtons>
        <Button style={{ marginRight: 8 }} onPress={handleCloseModal}>
          <TextButton>Não</TextButton>
        </Button>
        <Button onPress={handleYesButton}>
          <TextButton>Sim</TextButton>
        </Button>
      </ContainerButtons>
    </Container>
  );
};

export default ModalDeleteteAddress;
