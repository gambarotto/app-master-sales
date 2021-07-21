import React, { useCallback, useEffect, useState } from 'react';

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
import api from '../../services/api';

const AdressesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: adresses } = useFetch<IAddress[]>('users/adresses/me');

  const { updateAdresses } = useAuth();
  useEffect(() => {
    updateAdresses(adresses as IAddress[]);
  }, [adresses, updateAdresses]);

  const [selected, setSelected] = useState('id');

  const handleSelected = useCallback(
    (address_id: string) => {
      if (adresses) {
        adresses.forEach((address, index) => {
          adresses[index].default = address.id === address_id;
        });
      }
      setSelected(address_id);
    },
    [adresses],
  );
  const handleCreateAddress = useCallback(() => {
    navigation.navigate('CreateEditAddress');
  }, [navigation]);

  const handleConfirmSelectedAddress = useCallback(async () => {
    await api.patch(`/users/adresses/me/${selected}/default`);
    navigation.goBack();
  }, [navigation, selected]);

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
        <ButtonAdd onPress={handleCreateAddress}>
          <Icon
            name="add-circle"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ButtonAdd>
      </ContainerHeader>
      <ContainerAdressesList>
        <AdressesList
          data={adresses}
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
        <Button
          onPress={handleConfirmSelectedAddress}
          textSize={16}
          color="secondary"
        >
          Confirmar
        </Button>
      </ContainerButton>
    </Container>
  );
};

export default AdressesScreen;
