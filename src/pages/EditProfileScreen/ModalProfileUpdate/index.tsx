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
  success: boolean;
}

const ModalProfileUpdate: React.FC<IModalProps> = ({
  setModalIsOpen,
  success,
}) => {
  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  return (
    <Container>
      <ContainerInfo>
        <Icon
          name="check-circle-outline"
          size={66}
          color={themeGlobal.colors.green}
        />
        <TextDescription>
          {success
            ? 'Perfil atualizado com sucesso!'
            : 'Falha ao atualizar o perfil'}
        </TextDescription>
      </ContainerInfo>
      <ButtonOk onPress={handleCloseModal}>
        <TextButton>Ok</TextButton>
      </ButtonOk>
    </Container>
  );
};

export default ModalProfileUpdate;
