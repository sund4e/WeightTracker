import React from 'react';
import { View, ViewProps } from 'react-native';

import { Style } from '../../theme';
import { Text } from '../Text/Text';

function arrayFromRange(min: number, max: number): number[] {
  const len = max - min + 1;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = min + i;
  }
  return arr;
}

export const YAxis = ({
  maxValue,
  minValue,
  chartHeight,
  ...overrideProps
}: {
  maxValue: number;
  minValue: number;
  chartHeight: number;
} & ViewProps) => {
  const yAxisValues = arrayFromRange(minValue, maxValue).reverse();
  const { style, ...rest } = overrideProps;

  return (
    <View style={[styles.yAxis, style]} {...rest}>
      {yAxisValues.map((value, index) => (
        <Text
          size="small"
          key={`yLabel-${index}`}
        >{`${value.toString()} kg`}</Text>
      ))}
    </View>
  );
};

const styles = Style.create((theme) => ({
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: theme.spacing.small,
  },
}));
