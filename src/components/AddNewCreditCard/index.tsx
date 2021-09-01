import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Alert, Platform, TextInput } from 'react-native';
import Input from '../Input';
import InputMask from '../InputMask';

import { ButtonAddCard, Container, LineInputs, TextButton } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { INewCard } from '../../pages/PaymentScreen';

interface ICreditCardForm {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
}
interface Props {
  // eslint-disable-next-line no-unused-vars
  addNewCardData(card: INewCard): void;
}

const AddNewCreditCard: React.FC<Props> = ({ addNewCardData }) => {
  const formRef = useRef<FormHandles>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const cardNameRef = useRef<TextInput>(null);
  const cardExpirationRef = useRef<TextInput>(null);
  const cardCvvRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ICreditCardForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          card_number: Yup.string()
            .max(16)
            .min(15)
            .required('Numero do catão inválido'),
          card_holder_name: Yup.string().required('Informe o nome do cartão'),
          card_expiration_date: Yup.string().length(4).required(),
          card_cvv: Yup.string().length(3).required(),
        });
        Object.assign(data, {
          card_number: data.card_number.toString().replace(/,/g, ''),
        });
        await schema.validate(data, { abortEarly: false });
        addNewCardData(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro ao adicionar o cartão',
          'Ocorreu um erro ao adicionar o cartão, tente novamente.',
        );
      }
    },
    [addNewCardData],
  );

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputMask
          style={{ minHeight: 50 }}
          ref={cardNumberRef}
          type="credit-card"
          name="card_number"
          label="Numero do cartão"
          maxLength={19}
          initialValue={undefined}
          returnKeyType="next"
          onSubmitEditing={() => {
            cardNameRef.current?.focus();
          }}
        />
        <Input
          style={{ minHeight: 50 }}
          ref={cardNameRef}
          name="card_holder_name"
          label="Nome do cartão"
          defaultValue={undefined}
          initialValue={undefined}
          returnKeyType="next"
          onSubmitEditing={() => {
            cardExpirationRef.current?.focus();
          }}
        />
        <LineInputs>
          <Input
            style={{ minHeight: 50, maxHeight: 50, maxWidth: 90 }}
            ref={cardExpirationRef}
            name="card_expiration_date"
            label="Validade"
            defaultValue={undefined}
            initialValue={undefined}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={() => {
              cardCvvRef.current?.focus();
            }}
          />
          <Input
            style={{
              minHeight: 50,
              maxHeight: 50,
              maxWidth: 60,
              marginLeft: 16,
            }}
            ref={cardCvvRef}
            name="card_cvv"
            label="CVV"
            maxLength={3}
            defaultValue={undefined}
            initialValue={undefined}
            keyboardType="numeric"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <ButtonAddCard
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            <TextButton>ok</TextButton>
          </ButtonAddCard>
        </LineInputs>
      </Form>
    </Container>
  );
};

export default AddNewCreditCard;
