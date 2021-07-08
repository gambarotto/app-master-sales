import 'styled-components/native';
import themeGlobal from '../styles/global';

declare module 'styled-components/native' {
  type ThemeType = typeof themeGlobal;
  export interface DefaultTheme extends ThemeType {}
}
