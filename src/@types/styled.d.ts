import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      white: string;
      white2: string;
      gray: string;
      gray1: string;
      gray2: string;
      gray3: string;
      green: string;
      red: string;
    };
  }
}
