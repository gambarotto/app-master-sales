import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import IconBack from '../../components/IconBack';
import { useFetch } from '../../hooks/useFetch';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import {
  Container,
  ContainerDescription,
  ContainerGallery,
  ContainerHeader,
  ContainerImage,
  ContainerItem,
  Description,
  ImageLogo,
  PhotoItem,
  PhotosList,
  Title,
} from './styles';
import ModalPhoto from './ModalPhoto';

interface IAddressStore {
  id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement: string;
  reference_point: string;
  lat: number;
  long: number;
}
export interface IPhotoStore {
  id: string;
  name: string;
  image_url: string;
}
interface IStore {
  id: string;
  name: string;
  description: string;
  cnpj: string;
  address: IAddressStore;
  photos: IPhotoStore[];
}

const AboutStoreScreen: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [photoSelected, setPhotoSelected] = useState<IPhotoStore>(
    {} as IPhotoStore,
  );
  const navigation = useNavigation();
  const { data: stores } = useFetch<IStore[]>('stores', 'stores');

  const handlePhoto = useCallback((item: IPhotoStore) => {
    setPhotoSelected(item);
    setOpenModal(true);
  }, []);
  if (!stores) return null;
  return (
    <Container>
      <ContainerHeader>
        <IconBack onPress={() => navigation.goBack()} />
        <ContainerImage>
          <ImageLogo source={logoImage} />
        </ContainerImage>
      </ContainerHeader>
      <ContainerDescription>
        <Title>Sobre a Leiteria</Title>
        <Description>{stores[0].description}</Description>
      </ContainerDescription>
      <ContainerGallery>
        <Title style={{ alignSelf: 'flex-start' }}>Galeria de Imagens</Title>
        <PhotosList
          data={stores[0].photos}
          keyExtractor={(photo) => photo.id}
          numColumns={3}
          renderItem={({ item }) => (
            <ContainerItem onPress={() => handlePhoto(item)}>
              <PhotoItem source={{ uri: item.image_url }} />
            </ContainerItem>
          )}
        />
      </ContainerGallery>
      <Modal
        style={{ margin: 0 }}
        isVisible={openModal}
        animationIn="zoomIn"
        animationInTiming={700}
        onBackdropPress={() => setOpenModal(false)}
        onBackButtonPress={() => setOpenModal(false)}
        backdropOpacity={0.9}
      >
        <ModalPhoto photo={photoSelected} setOpenModal={setOpenModal} />
      </Modal>
    </Container>
  );
};

export default AboutStoreScreen;
