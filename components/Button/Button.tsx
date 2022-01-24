import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';

import { Style } from '../../theme';
import { Text } from '../Text/Text';

export const Button = ({
  children,
  style: styleOverride,
  onPress,
}: {
  children?: React.ReactElement | string;
  style?: ViewStyle;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{ ...styles.button, ...styleOverride }}>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    </Pressable>
  );
};

const styles = Style.create((theme) => ({
  button: {
    padding: theme.spacing.medium,
    borderRadius: 100,
    color: theme.color.text,
    backgroundColor: theme.color.primary,
    borderColor: theme.color.accent,
    borderWidth: 1,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
