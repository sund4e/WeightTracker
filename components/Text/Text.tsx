import React from 'react';
import { Text as RNText } from 'react-native';

import { Style } from '../../theme';

export const Text = ({
  children,
  size,
}: {
  children?: React.ReactElement | string;
  size?: 'large';
}) => {
  const style = {
    ...styles.text,
    ...(size === 'large' ? styles.textLarge : {}),
  };
  return <RNText style={style}>{children}</RNText>;
};

const styles = Style.create((theme) => ({
  text: {
    color: theme.color.text,
    fontSize: theme.font.medium,
  },
  textLarge: {
    fontSize: theme.font.large,
  },
}));
