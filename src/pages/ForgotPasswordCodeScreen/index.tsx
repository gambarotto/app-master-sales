import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import api from '../../services/api';

import {
  ConfirmButtonContainer,
  ConfirmTextButton,
  Container,
  ContainerInputCode,
  TextInputCode,
  TextInsertCode,
} from './styles';

const ForgotPasswordCodeScreen: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const codeMutation = useMutation(
    async (code: string) =>
      api.get(`users/passwords/reset/verify-code/${code}`),
    {
      onSuccess: (_response, code) =>
        navigation.navigate('NewPassword', { verification_code: code }),
    },
  );
  const handleConfirmCode = useCallback(() => {
    if (inputValue.length !== 6) {
      return;
    }
    codeMutation.mutate(inputValue);
    // navigation.navigate('NewPassword', { verification_code: inputValue });
  }, [codeMutation, inputValue]);

  return (
    <Container>
      <TextInsertCode>Insira o código de recuperação</TextInsertCode>
      <ContainerInputCode>
        <TextInputCode
          maxLength={6}
          placeholder="******"
          keyboardType="number-pad"
          onChangeText={(text) => setInputValue(text)}
        />
      </ContainerInputCode>
      <ConfirmButtonContainer
        onPress={handleConfirmCode}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 50,
            height: 20,
          },
          shadowOpacity: 0,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <ConfirmTextButton>Confirmar</ConfirmTextButton>
      </ConfirmButtonContainer>
    </Container>
  );
};
export default ForgotPasswordCodeScreen;
