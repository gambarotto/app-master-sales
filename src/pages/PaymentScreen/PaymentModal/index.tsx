import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useWindowDimensions } from 'react-native';
import { AnimatePresence, useAnimationState } from 'moti';
import { ICreditCard, INewCard } from '..';
import AddNewCreditCard from '../../../components/AddNewCreditCard';
import CheckCircle from '../../../components/CheckCircle';
import CreditCardItem from '../../../components/CreditCardItem';

import {
  ButtonConfirm,
  Container,
  ContainerAddCreditCard,
  ContainerModal,
  ContainerModalContent,
  ContainerNewCard,
  KeybordAvoiding,
  NewCardNumber,
  TextAddNewCreditCard,
  TextButton,
  TextModal,
} from './styles';

interface Props {
  cards: ICreditCard[] | undefined;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setNewCreditCard: Dispatch<SetStateAction<INewCard>>;
  setCreditCardPayment: Dispatch<SetStateAction<ICreditCard>>;
}

const PaymentModal: React.FC<Props> = ({
  cards,
  setIsVisible,
  setNewCreditCard,
  setCreditCardPayment,
}) => {
  const { height: heightDevice } = useWindowDimensions();
  const [addNewCard, setAddNewCard] = useState(false);
  const [newCard, setNewCard] = useState<INewCard>({} as INewCard);
  const [creditCard, setCreditCard] = useState<ICreditCard>({} as ICreditCard);

  const animationModal = useAnimationState({
    from: {
      translateY: heightDevice,
    },
    to: {
      translateY: 0,
      height: heightDevice / 2,
    },
    open: {
      translateY: 0,
    },
    close: {
      translateY: heightDevice,
    },
    extendHeight: {
      height: heightDevice,
    },
  });
  const animationBackgroundModal = useAnimationState({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
    open: {
      opacity: 0,
    },
    close: {
      opacity: 0,
    },
  });

  const addNewCardData = useCallback(
    (card: INewCard) => {
      animationModal.transitionTo('to');
      setAddNewCard(false);
      setNewCard(card);
    },
    [animationModal],
  );

  const handleChooseNewCard = useCallback(() => {
    setCreditCard({} as ICreditCard);
  }, []);

  const handleAddNewCard = useCallback(() => {
    animationModal.transitionTo('extendHeight');
    setAddNewCard(true);
  }, [animationModal]);

  const formatCardNumber = useMemo(() => {
    if (newCard.card_number) {
      return newCard.card_number.replace(/[0-9](?=.*.{4})/g, '*');
    }
    return '';
  }, [newCard.card_number]);

  const handleConfirm = useCallback(() => {
    if (newCard.card_number && !creditCard.id) {
      setNewCreditCard(newCard);
    } else if (creditCard.id) {
      setCreditCardPayment(creditCard);
    }
    animationBackgroundModal.transitionTo('close');
    animationModal.transitionTo('close');

    if (animationModal.current === 'close') {
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  }, [
    animationBackgroundModal,
    animationModal,
    creditCard,
    newCard,
    setCreditCardPayment,
    setIsVisible,
    setNewCreditCard,
  ]);

  return (
    <ContainerModal>
      <AnimatePresence>
        <Container
          state={animationBackgroundModal}
          transition={{ type: 'timing', duration: 500 }}
          exitTransition={{ type: 'timing', duration: 500 }}
        >
          <ContainerModalContent
            state={animationModal}
            transition={{ type: 'timing', duration: 500 }}
            exitTransition={{ type: 'timing', duration: 500 }}
          >
            <KeybordAvoiding>
              <TextModal>Cartão de Crédito</TextModal>
              {cards &&
                cards?.length > 0 &&
                cards.map((card) => (
                  <CreditCardItem
                    key={card.id}
                    card={card}
                    setCreditCardData={setCreditCard}
                    selected={creditCard}
                  />
                ))}
              <ContainerAddCreditCard
                onPress={handleAddNewCard}
                disabled={addNewCard}
              >
                <TextAddNewCreditCard>
                  Adicionar um novo cartão
                </TextAddNewCreditCard>
              </ContainerAddCreditCard>
              {addNewCard && (
                <AddNewCreditCard addNewCardData={addNewCardData} />
              )}
              {!addNewCard && newCard.card_holder_name && (
                <ContainerNewCard onPress={handleChooseNewCard}>
                  <CheckCircle
                    isChecked={!!(!creditCard.id && newCard.card_number)}
                  />
                  <NewCardNumber>{formatCardNumber}</NewCardNumber>
                </ContainerNewCard>
              )}
            </KeybordAvoiding>
            <ButtonConfirm onPress={handleConfirm}>
              <TextButton>
                {!creditCard.id && !newCard.card_number
                  ? 'Voltar'
                  : 'Confirmar'}
              </TextButton>
            </ButtonConfirm>
          </ContainerModalContent>
        </Container>
      </AnimatePresence>
    </ContainerModal>
  );
};

export default PaymentModal;
