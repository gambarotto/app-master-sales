import React, { Dispatch, SetStateAction, useCallback } from 'react';
import themeGlobal from '../../../styles/global';
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
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const PaymentModalError: React.FC<Props> = ({ setIsVisible }) => {
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);
  return (
    <ContainerModal>
      <Container>
        <ContainerModalContent>
          <Icon name="error" size={66} color={themeGlobal.colors.red} />
          <TextError>
            Ops...algo deu errado, por favor tente novamente
          </TextError>
          <ButtonConfirm onPress={handleClose}>
            <TextButton>ok</TextButton>
          </ButtonConfirm>
        </ContainerModalContent>
      </Container>
    </ContainerModal>
  );
};

export default PaymentModalError;
