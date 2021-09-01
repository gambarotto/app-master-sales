/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { ICreditCard } from '../../pages/PaymentScreen';
import { brands } from '../../utils/brands';
import CheckCircle from '../CheckCircle';

import { Brand, Container, LastNumbersCard } from './styles';

interface Props {
  card: ICreditCard;
  selected: ICreditCard;
  setCreditCardData(card: ICreditCard): void;
}
const CreditCardItem: React.FC<Props> = ({
  card,
  selected,
  setCreditCardData,
}) => {
  const selectBrand = useMemo(() => brands[card.brand], [card.brand]);
  const handleSelectedCard = useCallback(() => {
    if (selected.id === card.id) {
      setCreditCardData({} as ICreditCard);
      return;
    }
    setCreditCardData(card);
  }, [card, selected.id, setCreditCardData]);
  return (
    <Container onPress={handleSelectedCard}>
      <CheckCircle isChecked={selected.id === card.id} size={20} />
      <Brand source={selectBrand} />
      <LastNumbersCard>{`**** ${card.last_digits}`}</LastNumbersCard>
    </Container>
  );
};

export default CreditCardItem;
