/* eslint-disable no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import { useAnimationState } from 'moti';
import React, { useCallback, useMemo, useState } from 'react';
import { IAddress } from '../../contexts/auth';
import themeGlobal from '../../styles/global';

import {
  AliasAddress,
  Container,
  ContainerData,
  ContainerEdit,
  Icon,
  TextAddressDescription,
  TextEdit,
} from './styles';

interface Props {
  address: IAddress;
  isSelected: boolean;
  handleSelected(address_id: string): void;
  index: number;
}

const AddressItem: React.FC<Props> = ({
  address,
  isSelected,
  handleSelected,
  index,
}) => {
  const navigation = useNavigation();
  const changeColor = useMemo(
    () =>
      isSelected ? themeGlobal.colors.secondary : themeGlobal.colors.gray3,
    [isSelected],
  );

  const animationItem = useAnimationState({
    from: {
      translateY: 30,
      opacity: 0,
    },
    to: {
      translateY: 0,
      opacity: 1,
    },
  });
  const handleEditAddress = useCallback(
    (addressData) => {
      navigation.navigate('CreateEditAddress', addressData);
    },
    [navigation],
  );
  const handleSelectAddress = useCallback(() => {
    handleSelected(address.id);
  }, [address.id, handleSelected]);

  return (
    <Container
      isSelected={isSelected}
      state={animationItem}
      transition={{ type: 'timing', duration: 350 + index * 100 }}
    >
      <ContainerData onPress={handleSelectAddress}>
        <AliasAddress isSelected={isSelected}>{address.alias}</AliasAddress>
        <TextAddressDescription
          isSelected={isSelected}
        >{`${address.street}, ${address.number}`}</TextAddressDescription>
        <TextAddressDescription
          isSelected={isSelected}
          style={{ marginBottom: 4 }}
        >
          {`${address.city}, ${address.zip_code}`}
        </TextAddressDescription>
        {address.complement && (
          <TextAddressDescription isSelected={isSelected}>
            {address.complement}
          </TextAddressDescription>
        )}
        {address.reference_point && (
          <TextAddressDescription isSelected={isSelected}>
            {address.reference_point}
          </TextAddressDescription>
        )}
      </ContainerData>
      <ContainerEdit onPress={() => handleEditAddress(address)}>
        <Icon name="edit" size={16} color={changeColor} />
        <TextEdit isSelected={isSelected}>Editar</TextEdit>
      </ContainerEdit>
    </Container>
  );
};

export default AddressItem;
