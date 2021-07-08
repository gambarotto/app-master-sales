import React, { createContext, useContext } from 'react';

interface IProductContext {}

const ProductContext = createContext<IProductContext>({});

const ProductProvider: React.FC = ({ children }) => (
  <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
);

function useProduct(): IProductContext {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}

export { ProductProvider, useProduct };
