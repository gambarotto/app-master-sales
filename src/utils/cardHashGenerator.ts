import CryptoJS from 'react-native-crypto-js';
import api from '../services/api';

interface Card {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
}

export async function createCardHash(card: Card): Promise<string> {
  const data = await api.get('users/secret');

  const secret = CryptoJS.AES.decrypt(
    data.data.secret,
    'mastersalesappbns',
  ).toString(CryptoJS.enc.Utf8);

  const cardHash = await CryptoJS.AES.encrypt(
    JSON.stringify(card),
    secret,
  ).toString();

  return cardHash;
}
