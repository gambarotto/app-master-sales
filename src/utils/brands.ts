import visaLogo from '../assets/brands/visa.png';
import masterLogo from '../assets/brands/mastercard.png';
import dinersLogo from '../assets/brands/diners.png';
import amexLogo from '../assets/brands/amex.png';
import unknownLogo from '../assets/brands/unknown.png';

interface IBrands {
  [key: string]: any;
}

export const brands: IBrands = {
  visa: visaLogo,
  master: masterLogo,
  diners: dinersLogo,
  amex: amexLogo,
  unknown: unknownLogo,
};
