/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { IProduct } from './products';

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
interface ICartContext {
  cartProducts: ICartProduct[];
  countCartProducts: number;
  handleProduct(product: ICartProduct): void;
  clearCart(): void;
}
const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [isDelivery, setIsDelivery] = useState(true);
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
        newState.splice(itemIndex, 1);
        return [...newState];
      }

      newState[itemIndex].quantity = product.quantity;

      return newState;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartProducts([] as ICartProduct[]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        handleProduct,
        clearCart,
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
