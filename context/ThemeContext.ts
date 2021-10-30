import {createContext} from 'react';
import {StyleSheet} from 'react-native';

export type ThemeName = 'light' | 'dark';

export type ThemeProps = {
  globalTheme: ThemeName;
  setGlobalTheme: Function;
};

const darkTheme = StyleSheet.create({
  theme: {
    backgroundColor: '#4e4e4ea3',
    color: 'white',
  },
});

const lightTheme = StyleSheet.create({
  theme: {
    backgroundColor: '#a3a3a323',
    color: 'white',
  },
});

const ThemeContext = createContext<ThemeProps | null>(null);

export {darkTheme, lightTheme, ThemeContext};
