/* eslint-disable no-unused-vars */
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
}

const AddressItem: React.FC<Props> = ({
  address,
  isSelected,
  handleSelected,
}) => {
  const changeColor = useMemo(
    () =>
      isSelected ? themeGlobal.colors.secondary : themeGlobal.colors.gray3,
    [isSelected],
  );
  return (
    <Container isSelected={isSelected}>
      <ContainerData onPress={() => handleSelected(address.id)}>
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
      <ContainerEdit>
        <Icon name="edit" size={16} color={changeColor} />
        <TextEdit isSelected={isSelected}>Editar</TextEdit>
      </ContainerEdit>
    </Container>
  );
};

export default AddressItem;
