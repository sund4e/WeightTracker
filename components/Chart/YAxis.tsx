import React from 'react';
import { View } from 'react-native';

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
}: {
  maxValue: number;
  minValue: number;
  chartHeight: number;
}) => {
  const yAxisValues = arrayFromRange(minValue, maxValue).reverse();

  // react-native-chart-kit doesn't draw chart area for the full chart height
  // realHeight revers engineered from here:
  // https://github.com/indiespirit/react-native-chart-kit/blob/134ed05556c20e3bfdcf4b77bf32c647636d2656/src/AbstractChart.tsx#L288
  const fontSize = 12;
  const realHeight = chartHeight * 0.75 + 2 * fontSize;

  return (
    <View style={{ ...styles.yAxis, height: realHeight }}>
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
