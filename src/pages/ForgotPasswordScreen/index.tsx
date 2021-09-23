import React from 'react';

import {
  Container,
  FlowForgetPassword,
  FlowContainer,
  TextFirstStep,
  FlowButtonContainer,
  FlowTextButton,
  ContainerAlreadyHaveCode,
  TextAlreadyHaveCode,
} from './styles';

const ForgotPasswordScreen: React.FC = () => {
  const flow = new Array(3);
  return (
    <Container>
      <FlowForgetPassword
        data={flow}
        keyExtractor={(_item, index) => String(index + Math.random())}
        renderItem={() => <FlowContainer />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <TextFirstStep>
        Se você esqueceu sua senha, nos enviaremos um código para o e-mail
        cadastrado
      </TextFirstStep>
      <ContainerAlreadyHaveCode>
        <TextAlreadyHaveCode>Já tem um código?</TextAlreadyHaveCode>
      </ContainerAlreadyHaveCode>
      <FlowButtonContainer
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
        <FlowTextButton>Enviar e-mail</FlowTextButton>
      </FlowButtonContainer>
    </Container>
  );
};

export default ForgotPasswordScreen;
