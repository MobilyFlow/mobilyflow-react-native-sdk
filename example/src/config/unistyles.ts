import { StyleSheet } from 'react-native-unistyles';

export type ThemeType = {
  name: 'light';
};

const theme: ThemeType = {
  name: 'light',
};

export const breakpoints = {
  mobile: 0,
  tablet: 992,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: ThemeType;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: theme,
  },
  breakpoints,
  settings: {
    initialTheme: 'light',
  },
});
