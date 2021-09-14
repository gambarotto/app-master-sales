import React, { useCallback, useEffect, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  AdressesList,
  ButtonAdd,
  ButtonBack,
  Container,
  ContainerAdressesList,
  ContainerButton,
  ContainerHeader,
  Icon,
  TextSelectAddress,
  TitleAdresses,
} from './styles';
import themeGlobal from '../../styles/global';
import { useFetch } from '../../hooks/useFetch';
import { IAddress, useAuth } from '../../contexts/auth';
import AddressItem from '../../components/AddressItem';
import Button from '../../components/Button';
import api from '../../services/api';
import LoadingContent from '../../components/LoadingContent';

const AdressesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: adresses } = useFetch<IAddress[]>(
    'adresses',
    'users/adresses/me',
  );

  const { updateAdresses } = useAuth();
  const [selected, setSelected] = useState('');

  useFocusEffect(
    useCallback(
      () => () => {
        setSelected('');
      },
      [],
    ),
  );
  useEffect(() => {
    updateAdresses(adresses as IAddress[]);
  }, [adresses, updateAdresses]);
  useEffect(() => {
    const defaultAddress = adresses?.find((adrs) => adrs.default === true);
    setSelected(defaultAddress?.id as string);
  }, [adresses]);

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
    if (adresses && adresses.length === 0) {
      navigation.navigate('CreateEditAddress');
      return;
    }
    await api.patch(`/users/adresses/me/${selected}/default`);

    navigation.goBack();
  }, [adresses, navigation, selected]);

  if (adresses === undefined) {
    <LoadingContent />;
  }
  return (
    <Container>
      <ContainerHeader
        from={{ translateY: -30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <ButtonBack onPress={() => navigation.goBack()}>
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
      <TextSelectAddress
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        {adresses && adresses?.length > 0
          ? 'Selecione o endereço que gostaria de receber as entregas'
          : 'Você ainda não possui um endereço cadastrado'}
      </TextSelectAddress>
      {adresses && adresses.length > 0 && (
        <ContainerAdressesList>
          <AdressesList
            data={adresses}
            keyExtractor={(address) => address.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: address, index }) => (
              <AddressItem
                isSelected={address.default || address.id === selected}
                handleSelected={handleSelected}
                index={index}
                address={address}
              />
            )}
          />
        </ContainerAdressesList>
      )}
      <ContainerButton>
        <Button
          onPress={handleConfirmSelectedAddress}
          textSize={16}
          color="secondary"
        >
          {adresses && adresses.length === 0 ? 'Criar endereço' : 'Confirmar'}
        </Button>
      </ContainerButton>
    </Container>
  );
};

export default AdressesScreen;
