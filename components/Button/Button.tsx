import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';

import { Style, useTheme } from '../../theme';
import { Text } from '../Text/Text';

export const Button = ({
  children,
  style: styleOverride,
  onPress,
  preset,
}: {
  children?: React.ReactElement | string;
  style?: ViewStyle;
  onPress: () => void;
  preset?: 'primary' | 'ghost';
}) => {
  const theme = useTheme();
  const buttonColors = {
    backgroundColor: preset === 'ghost' ? undefined : theme.color.primary,
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{ ...styles.button, ...buttonColors, ...styleOverride }}>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    </Pressable>
  );
};

const styles = Style.create((theme) => ({
  button: {
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    color: theme.color.text,
    borderColor: theme.color.accent,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    margin: theme.spacing.small,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
