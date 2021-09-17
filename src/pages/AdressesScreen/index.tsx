/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useEffect, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
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

interface IPropsItem {
  item: IAddress;
  index: number;
}

const AdressesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: adresses } = useFetch<IAddress[]>(
    'adresses',
    'users/adresses/me',
  );

  const { updateAdresses } = useAuth();
  const [selected, setSelected] = useState('');

  const queryClient = useQueryClient();
  const defaultMutation = useMutation(
    async (selected_address: string) =>
      api.patch(`/users/adresses/me/${selected_address}/default`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('address_default');
        navigation.goBack();
      },
    },
  );

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
    defaultMutation.mutate(selected);
  }, [adresses, defaultMutation, navigation, selected]);

  const renderItem = ({ item: address, index }: IPropsItem) => (
    <AddressItem
      isSelected={address.default || address.id === selected}
      handleSelected={handleSelected}
      index={index}
      address={address}
    />
  );
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
            renderItem={renderItem}
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
