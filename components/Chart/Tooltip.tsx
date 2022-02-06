import React from 'react';
import { View } from 'react-native';

import { Style } from '../../theme';
import { Text } from '../Text/Text';

export function Tooltip({
  x,
  y,
  value,
}: {
  x: number;
  y: number;
  value: string;
}) {
  return (
    <View style={{ ...styles.container, top: y, left: x }}>
      <Text>{value}</Text>
    </View>
  );
}

const styles = Style.create((theme) => ({
  container: {
    width: 100,
    height: 100,
  },
}));
