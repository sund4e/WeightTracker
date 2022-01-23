import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const theme = {
  spacing: {
    small: 5,
  },
  color: {
    primary: 'blue',
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
