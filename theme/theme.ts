import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  light: {
    1: '#FFFFFF',
    2: '#E6E6E7',
    3: 'AFADB1',
  },
  dark: {
    1: '#000000',
    2: '#292929',
    3: '#242424',
  },
  purple: {
    1: '#534C5F', // Do not use with text, not enough contrast
    2: '#433E47',
    3: '#332941',
    4: '#1F1A24',
  },
};

const theme = {
  spacing: {
    small: 10,
    medium: 20,
  },
  color: {
    shadow: palette.dark['3'],
    dark: palette.dark['2'],
    primary: palette.purple['3'],
    secondary: palette.purple['2'],
    accent: palette.purple['1'],
    surface: palette.purple['4'],
    text: palette.light['2'],
  },
};

const createStyle = <T extends NamedStyles<T>>(
  style: ((themeValue: typeof theme) => NamedStyles<T>) | NamedStyles<T>
): T => {
  if (typeof style !== 'function') {
    return StyleSheet.create(style);
  }
  return StyleSheet.create(style(theme));
};

export const Style = {
  create: createStyle,
};

export const useTheme = () => {
  return theme;
};
