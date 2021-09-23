/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import themeGlobal from '../../styles/global';
import {
  ButtonConfirm,
  Container,
  ContainerModal,
  ContainerModalContent,
  Icon,
  TextButton,
  TextError,
} from './styles';

interface Props {
  actionFunc: (data?: any) => void;
  message?: string;
  icon?: {
    name: string;
    color?: string;
    size?: number;
  };
}

const ModalAlert: React.FC<Props> = ({
  actionFunc,
  message,
  icon = { name: 'error', color: themeGlobal.colors.red },
}) => {
  const handleClose = useCallback(() => {
    actionFunc();
  }, [actionFunc]);
  return (
    <ContainerModal>
      <Container>
        <ContainerModalContent>
          <Icon name={icon.name} size={66} color={icon.color} />
          <TextError>
            {message || 'Ops...algo deu errado, por favor tente novamente'}
          </TextError>
          <ButtonConfirm onPress={handleClose}>
            <TextButton>ok</TextButton>
          </ButtonConfirm>
        </ContainerModalContent>
      </Container>
    </ContainerModal>
  );
};

export default ModalAlert;
