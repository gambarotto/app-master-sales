import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  AdressesList,
  ButtonBack,
  Container,
  ContainerAdressesList,
  ContainerHeader,
  Icon,
  TitleAdresses,
} from './styles';
import themeGlobal from '../../styles/global';
import { useFetch } from '../../hooks/useFetch';
import { IAddress, useAuth } from '../../contexts/auth';
import AddressItem from '../../components/AddressItem';

interface IIsSelected {
  [key: string]: boolean;
}

const AdressesScreen: React.FC = () => {
  const { updateAdresses } = useAuth();
  const adressesCreate = useMemo(
    () => [
      {
        id: '6f4a1e0b-f615-4b0c-9968-b2c9d4de215dTRABALHO',
        street: 'rua do trabalho',
        number: '1',
        district: 'bairro 1',
        city: 'cidade 1',
        zip_code: '13123123',
        complement: 'complemento 1',
        reference_point: 'referencia 1',
        alias: 'Trabalho',
      },
      {
        id: '6f4a1e0b-f615-4b0c-9968-b2c9d4de215oCASA',
        street: 'rua de casa',
        number: '2',
        district: 'bairro 2',
        city: 'cidade 2',
        zip_code: '13123123',
        complement: 'complemento 2',
        reference_point: 'referencia 2',
        alias: 'Casa',
      },
      {
        id: '6f4a1e0b-f615-4b0c-9968-b2c9d4d8e215oPAIS',
        street: 'rua de casa dos pais',
        number: '3',
        district: 'bairro 3',
        city: 'cidade 3',
        zip_code: '13133133',
        complement: 'complemento 3',
        reference_point: 'referencia 3',
        alias: 'Casa Pais',
      },
    ],
    [],
  );
  const createSelected = useMemo(() => {
    const selectedObject: IIsSelected = {};
    adressesCreate.forEach((address) => {
      selectedObject[address.id] = false;
    });
    return selectedObject;
  }, [adressesCreate]);
  const [selected, setSelected] = useState<IIsSelected>(createSelected);

  const handleSelected = useCallback((address_id: string) => {
    setSelected((state) => {
      const keys = Object.keys(state);
      const newState = { ...state };
      keys.forEach((key) => {
        newState[key] = false;
      });
      Object.assign(newState, { [address_id]: true });
      return newState;
    });
  }, []);
  // const { data: adresses } = useFetch<IAddress[]>('users/adresses/me');

  // useEffect(() => {
  //   updateAdresses(adresses as IAddress[]);
  // }, [adresses, updateAdresses]);
  return (
    <Container>
      <ContainerHeader>
        <ButtonBack>
          <Icon
            name="keyboard-arrow-left"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ButtonBack>
        <TitleAdresses>Endereços</TitleAdresses>
      </ContainerHeader>
      <ContainerAdressesList>
        <AdressesList
          data={adressesCreate}
          keyExtractor={(address) => address.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: address }) => (
            <AddressItem
              isSelected={selected[address.id]}
              handleSelected={handleSelected}
              address={address}
            />
          )}
        />
      </ContainerAdressesList>
    </Container>
  );
};

export default AdressesScreen;
