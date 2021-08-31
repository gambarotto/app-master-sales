/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { ICreditCard } from '../../pages/PaymentScreen';
import { brands } from '../../utils/brands';
import CheckCircle from '../CheckCircle';

import { Brand, Container, LastNumbersCard } from './styles';

interface Props {
  card: ICreditCard;
  selected: boolean;
  setCreditCardData(card: ICreditCard): void;
}
const CreditCardItem: React.FC<Props> = ({
  card,
  selected,
  setCreditCardData,
}) => {
  const selectBrand = useMemo(() => brands[card.brand], [card.brand]);
  const handleSelectedCard = useCallback(() => {
    setCreditCardData(card);
  }, [card, setCreditCardData]);
  return (
    <Container onPress={handleSelectedCard}>
      <CheckCircle isChecked={selected} size={20} />
      <Brand source={selectBrand} />
      <LastNumbersCard>{`**** ${card.last_digits}`}</LastNumbersCard>
    </Container>
  );
};

export default CreditCardItem;
