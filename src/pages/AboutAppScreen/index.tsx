import { useNavigation } from '@react-navigation/native';
import React from 'react';
import IconBack from '../../components/IconBack';
import logoImage from '../../assets/logo_horizontal_catarina.png';

import {
  Container,
  ContainerDescription,
  ContainerHeader,
  ContainerImage,
  Description,
  ImageLogo,
  Title,
} from './styles';

const AboutAppScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ContainerHeader>
        <IconBack onPress={() => navigation.goBack()} />
        <ContainerImage>
          <ImageLogo source={logoImage} />
        </ContainerImage>
      </ContainerHeader>
      <ContainerDescription>
        <Title>Sobre o App</Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </Description>
      </ContainerDescription>
    </Container>
  );
};

export default AboutAppScreen;
