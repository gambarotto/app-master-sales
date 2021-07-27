/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { IProductPhoto } from './products';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  adresses: IAddress[];
  favorite_products: IFavoriteProduct[];
}
export interface IAddress {
  id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement?: string;
  reference_point?: string;
  alias: string;
  default: boolean;
}
interface IFavoriteProduct {
  id: string;
  name: string;
  description: string;
  sale_price: number;
  photos: IProductPhoto;
}
interface IAuthData {
  user: IUser;
  token: string;
}
interface ISignIn {
  email: string;
  password: string;
  fb?: boolean;
}
interface IAuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credentials: ISignIn): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: IUser): Promise<void>;
  updateAdresses(adresses: IAddress[]): void;
}
const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthData>({} as IAuthData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyIfUserIsLogged(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        'AppSales:token',
        'AppSales:user',
      ]);
      if (token[1] && user[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] });

        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      }
      setLoading(false);
    }
    verifyIfUserIsLogged();
  }, []);

  const signIn = useCallback(
    async ({ email, password, fb = false }: ISignIn): Promise<void> => {
      const response = await api.post('sessions/users', {
        email,
        password,
      });

      if (response.data) {
        const { user, token } = response.data;
        await AsyncStorage.multiSet([
          ['AppSales:token', token],
          ['AppSales:user', JSON.stringify(user)],
          ['AppSales:facebook', JSON.stringify(fb)],
        ]);
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData(response.data);
      }
    },
    [],
  );
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      'AppSales:token',
      'AppSales:user',
      'AppSales:facebook',
    ]);
    setData({} as IAuthData);
  }, []);
  const updateUser = useCallback(async (user: IUser) => {
    setData((state) => {
      Object.assign(state, { user });
      return { ...state };
    });
  }, []);
  const updateAdresses = useCallback((adresses: IAddress[]) => {
    setData((state) => {
      Object.assign(state, { adresses });
      return { ...state };
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut,
        updateUser,
        updateAdresses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
