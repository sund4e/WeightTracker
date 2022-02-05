import React from 'react';
import { Text as RNText } from 'react-native';

import { Style } from '../../theme';

export const Text = ({
  children,
  size,
}: {
  children?: React.ReactElement | string;
  size?: 'large' | 'small';
}) => {
  const style = {
    ...styles.text,
    ...(size === 'large'
      ? styles.textLarge
      : size === 'small'
      ? styles.textSmall
      : {}),
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
  textSmall: {
    fontSize: theme.font.small,
  },
}));
