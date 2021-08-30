/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProductCategory {
  id: string;
  name: string;
}
export interface IProductPhoto {
  id: string;
  photo_url: string;
}
export interface IProduct {
  id: string;
  name: string;
  package: string;
  description: string;
  sale_price: number;
  categories: IProductCategory[];
  photos: IProductPhoto[];
}
interface IProductContext {
  products: IProduct[];
  favoriteProducts: IProduct[];
  updateProducts(productsRequest: IProduct[]): void;
  updateFavoriteProducts(productsRequest: IProduct[]): void;
}

const ProductContext = createContext<IProductContext>({} as IProductContext);

const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>(
    [] as IProduct[],
  );

  const updateProducts = useCallback((productsRequest: IProduct[]) => {
    setProducts(productsRequest);
  }, []);
  const updateFavoriteProducts = useCallback((productsRequest: IProduct[]) => {
    setFavoriteProducts(productsRequest);
  }, []);
  return (
    <ProductContext.Provider
      value={{
        products,
        favoriteProducts,
        updateProducts,
        updateFavoriteProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): IProductContext {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}

export { ProductProvider, useProduct };
