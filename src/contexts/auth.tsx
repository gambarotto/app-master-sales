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

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
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
        ]);
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData(response.data);
      }
    },
    [],
  );
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['AppSales:token', 'AppSales:user']);
    setData({} as IAuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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
