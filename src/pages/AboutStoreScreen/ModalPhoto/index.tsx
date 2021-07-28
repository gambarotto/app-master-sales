import React, { Dispatch, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { IPhotoStore } from '..';
import { Container, ImageStore } from './styles';

interface Props {
  photo: IPhotoStore;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
interface ImageSize {
  width: number;
  height: number;
}
const ModalPhoto: React.FC<Props> = ({ photo }) => {
  const [imageSize, setImageSize] = useState<ImageSize>({} as ImageSize);

  useEffect(() => {
    Image.getSize(photo.image_url, (photoWidth, photoHeight) => {
      const maxWidth = Dimensions.get('window').width;
      const maxHeight = Dimensions.get('window').height;

      const ratio = Math.min(maxWidth / photoWidth, maxHeight / photoHeight);
      setImageSize({
        width: photoWidth * ratio,
        height: photoHeight * ratio,
      });
    });
  }, [photo.image_url]);
  return (
    <Container>
      <ImageStore
        style={{ width: imageSize.width, height: imageSize.height }}
        source={{ uri: photo.image_url }}
      />
    </Container>
  );
};

export default ModalPhoto;
