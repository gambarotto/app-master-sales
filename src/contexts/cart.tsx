/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ICartProduct {
  id: string;
  name: string;
  description: string;
  sale_price: number;
  photo: {
    id: string;
    photo_url: string;
  };
}
interface ICartContext {
  cartProducts: ICartProduct[];
  countCartProducts: number;
  addProduct(product: ICartProduct): void;
  removeProduct(id: string): void;
}
const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);

  const addProduct = useCallback((product: ICartProduct) => {
    setCartProducts((state) => [...state, product]);
  }, []);
  const removeProduct = useCallback((id: string) => {
    setCartProducts((state) => {
      const products = state.filter((product) => product.id !== id);

      return [...products];
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
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
