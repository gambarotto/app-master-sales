import React, { Dispatch, SetStateAction, useCallback } from 'react';
import {
  ActionButton,
  Container,
  TextActionButton,
  TitleModal,
} from './styles';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface Props {
  setIsVisible: Dispatcher<boolean>;
}

const ModalChangePassword: React.FC<Props> = ({ setIsVisible }) => {
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return (
    <Container>
      <TitleModal>Trocar senha</TitleModal>
      <ActionButton confirmedButton>
        <TextActionButton confirmedButton>Trocar</TextActionButton>
      </ActionButton>
      <ActionButton onPress={handleClose} confirmedButton={false}>
        <TextActionButton confirmedButton={false}>Cancelar</TextActionButton>
      </ActionButton>
    </Container>
  );
};

export default ModalChangePassword;
