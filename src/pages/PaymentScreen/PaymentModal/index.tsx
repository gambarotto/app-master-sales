import { AnimatePresence } from 'moti';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ICreditCard, INewCard } from '..';
import AddNewCreditCard from '../../../components/AddNewCreditCard';
import CheckCircle from '../../../components/CheckCircle';
import CreditCardItem from '../../../components/CreditCardItem';

import {
  ButtonConfirm,
  Container,
  ContainerAddCreditCard,
  ContainerModalContent,
  ContainerNewCard,
  KeybordAvoiding,
  NewCardNumber,
  TextAddNewCreditCard,
  TextButton,
  TextModal,
} from './styles';

interface Props {
  // isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setNewCreditCard: Dispatch<SetStateAction<INewCard>>;
  setCreditCardPayment: Dispatch<SetStateAction<ICreditCard>>;
}

const PaymentModal: React.FC<Props> = ({
  setIsVisible,
  setNewCreditCard,
  setCreditCardPayment,
}) => {
  const { height: heightDevice } = useWindowDimensions();
  const [addNewCard, setAddNewCard] = useState(false);
  const [newCard, setNewCard] = useState<INewCard>({} as INewCard);
  const [creditCard, setCreditCard] = useState<ICreditCard>({} as ICreditCard);
  const cards: ICreditCard[] = [
    {
      id: 'yujo',
      brand: 'visa',
      holder_name: 'Diego Gambarotto',
      first_digits: '444222',
      last_digits: '5555',
      expiration_date: '1122',
    },
    {
      id: 'yujoujg',
      brand: 'master',
      holder_name: 'Diego Carvalho',
      first_digits: '777333',
      last_digits: '1234',
      expiration_date: '1023',
    },
  ];
  const addNewCardData = useCallback((card: INewCard) => {
    setAddNewCard(false);
    setNewCard(card);
  }, []);

  const handleChooseNewCard = useCallback(() => {
    if (newCard.card_number) {
      setNewCard({} as INewCard);
    }
    setCreditCard({} as ICreditCard);
  }, [newCard.card_number]);
  const handleConfirm = useCallback(() => {
    if (newCard.card_number && !creditCard.id) {
      setNewCreditCard(newCard);
    } else if (creditCard.id) {
      setCreditCardPayment(creditCard);
    }
    setIsVisible(false);
  }, [
    creditCard,
    newCard,
    setCreditCardPayment,
    setIsVisible,
    setNewCreditCard,
  ]);
  return (
    <AnimatePresence>
      <Container
        from={{ opacity: 0, backgroundColor: '#000' }}
        animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        exit={{ opacity: 0 }}
        exitTransition={{ type: 'timing', duration: 500 }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <ContainerModalContent
          from={{ translateY: heightDevice }}
          animate={{
            translateY: 0,
            height: addNewCard ? heightDevice : heightDevice / 2,
          }}
          exit={{
            translateY: -heightDevice,
          }}
          transition={{ type: 'timing', duration: 350 }}
        >
          <KeybordAvoiding>
            <TextModal>Cartão de Crédito</TextModal>
            {cards.map((card) => (
              <CreditCardItem
                key={card.id}
                card={card}
                setCreditCardData={setCreditCard}
                selected={creditCard}
              />
            ))}
            <ContainerAddCreditCard
              onPress={() => setAddNewCard(true)}
              disabled={addNewCard}
            >
              <TextAddNewCreditCard>
                Adicionar um novo cartão
              </TextAddNewCreditCard>
            </ContainerAddCreditCard>
            {addNewCard && <AddNewCreditCard addNewCardData={addNewCardData} />}
            {!addNewCard && newCard.card_holder_name && (
              <ContainerNewCard onPress={handleChooseNewCard}>
                <CheckCircle
                  isChecked={!!(!creditCard.id && newCard.card_number)}
                />
                <NewCardNumber>{newCard.card_number}</NewCardNumber>
              </ContainerNewCard>
            )}
          </KeybordAvoiding>
          <ButtonConfirm onPress={handleConfirm}>
            <TextButton>
              {!creditCard.id && !newCard.card_number ? 'Votar' : 'Confirmar'}
            </TextButton>
          </ButtonConfirm>
        </ContainerModalContent>
      </Container>
    </AnimatePresence>
  );
};

export default PaymentModal;
