import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  AdressesList,
  ButtonAdd,
  ButtonBack,
  Container,
  ContainerAdressesList,
  ContainerButton,
  ContainerHeader,
  Icon,
  TitleAdresses,
} from './styles';
import themeGlobal from '../../styles/global';
import { useFetch } from '../../hooks/useFetch';
import { IAddress, useAuth } from '../../contexts/auth';
import AddressItem from '../../components/AddressItem';
import Button from '../../components/Button';

interface IIsSelected {
  [key: string]: boolean;
}

const AdressesScreen: React.FC = () => {
  const navigation = useNavigation();
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
        default: true,
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
        default: false,
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
        default: false,
      },
    ],
    [],
  );

  const [selected, setSelected] = useState('id');
  // const [selected, setSelected] = useState<IIsSelected>(createSelected);

  const handleSelected = useCallback(
    (address_id: string) => {
      adressesCreate.forEach((address, index) => {
        adressesCreate[index].default = address.id === address_id;
      });
      setSelected(address_id);
    },
    [adressesCreate],
  );
  // const { data: adresses } = useFetch<IAddress[]>('users/adresses/me');

  // useEffect(() => {
  //   updateAdresses(adresses as IAddress[]);
  // }, [adresses, updateAdresses]);
  return (
    <Container>
      <ContainerHeader>
        <ButtonBack onPress={() => navigation.navigate('Tabs')}>
          <Icon
            name="keyboard-arrow-left"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ButtonBack>
        <TitleAdresses>Endereços</TitleAdresses>
        <ButtonAdd>
          <Icon
            name="add-circle"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ButtonAdd>
      </ContainerHeader>
      <ContainerAdressesList>
        <AdressesList
          data={adressesCreate}
          keyExtractor={(address) => address.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: address }) => (
            <AddressItem
              isSelected={address.default || address.id === selected}
              handleSelected={handleSelected}
              address={address}
            />
          )}
        />
      </ContainerAdressesList>
      <ContainerButton>
        <Button textSize={16} color="secondary">
          Confirmar
        </Button>
      </ContainerButton>
    </Container>
  );
};

export default AdressesScreen;
