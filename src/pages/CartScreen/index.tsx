import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import CartProductItem from '../../components/CartProductItem';
import ModalCartProductQty from '../../components/ModalCartProductQty';

import { Container } from './styles';

export interface ICartProductItem {
  product: {
    id: string;
    name: string;
    description: string;
    sale_price: number;
    photo: {
      id: string;
      photo_url: string;
    };
  };
  quantity: number;
}

const CartScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentItemModal, setCurrentItemModal] = useState<ICartProductItem>(
    {} as ICartProductItem,
  );

  const products: ICartProductItem[] = [
    {
      product: {
        id: '1',
        name: 'Queijo 1',
        description:
          'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
        sale_price: 27.9,
        photo: {
          id: '1',
          photo_url:
            'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
        },
      },
      quantity: 1,
    },
    {
      product: {
        id: '2',
        name: 'Queijo 2',
        description:
          'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
        sale_price: 27.9,
        photo: {
          id: '2',
          photo_url:
            'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
        },
      },
      quantity: 1,
    },
    {
      product: {
        id: '3',
        name: 'Queijo 3',
        description:
          'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
        sale_price: 27.9,
        photo: {
          id: '3',
          photo_url:
            'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
        },
      },
      quantity: 1,
    },
    {
      product: {
        id: '4',
        name: 'Queijo 4',
        description:
          'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
        sale_price: 27.9,
        photo: {
          id: '4',
          photo_url:
            'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
        },
      },
      quantity: 1,
    },
    {
      product: {
        id: '5',
        name: 'Queijo 5',
        description:
          'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
        sale_price: 27.9,
        photo: {
          id: '5',
          photo_url:
            'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
        },
      },
      quantity: 1,
    },
  ];
  const handlePressCartProduct = useCallback((item) => {
    setCurrentItemModal(item);
    setShowModal((state) => !state);
  }, []);
  const handleModal = useCallback(() => {
    setShowModal((state) => !state);
  }, []);

  return (
    <Container>
      {products.map((item) => (
        <CartProductItem
          item={item}
          handlePressCartProduct={handlePressCartProduct}
        />
      ))}
      <Modal
        style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}
        isVisible={showModal}
      >
        <ModalCartProductQty
          handleModal={handleModal}
          item={currentItemModal}
        />
      </Modal>
    </Container>
  );
};

export default CartScreen;
