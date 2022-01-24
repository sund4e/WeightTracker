import React from 'react';
import { Text as RNText } from 'react-native';

import { Style } from '../../theme';

export const Text = ({
  children,
}: {
  children?: React.ReactElement | string;
}) => {
  return <RNText style={styles.text}>{children}</RNText>;
};

const styles = Style.create((theme) => ({
  text: {
    color: theme.color.text,
    fontSize: theme.font.medium,
  },
}));
