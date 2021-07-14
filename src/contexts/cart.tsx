/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ICartProduct {
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
interface ICartContext {
  cartProducts: ICartProduct[];
  countCartProducts: number;
  handleProduct(product: ICartProduct): void;
}
const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);

  const handleProduct = useCallback((product: ICartProduct) => {
    setCartProducts((state) => {
      const itemIndex = state.findIndex(
        (item) => item.product.id === product.product.id,
      );
      if (itemIndex < 0) {
        return [...state, product];
      }

      const newState = [...state];

      if (product.quantity === 0) {
        newState.slice(itemIndex, 1);
        return [...newState];
      }

      newState[itemIndex].quantity = product.quantity;

      return newState;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        handleProduct,
        countCartProducts: cartProducts.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): ICartContext {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
