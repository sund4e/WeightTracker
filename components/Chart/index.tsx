import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, useTheme } from 'react-native-paper';

import { WeightData } from '../../weights';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.75;

export default function Chart({
  data,
  currentDate,
  setDate,
  width,
  height,
}: {
  data: WeightData;
  currentDate: string;
  setDate: (newDate: string) => void;
  width?: number;
  height?: number;
}) {
  const { colors } = useTheme();
  const keys = Object.keys(data).map(
    (date) => `${new Date(date).getDate()}/${new Date(date).getMonth()}`
  );
  const values = Object.values(data);

  const onPointClick = (pointData: { index: number; value: number }) => {
    setDate(Object.keys(data)[pointData.index]);
  };

  const getDotColor = (dataPoint: number, dataPointIndex: number) => {
    if (Object.keys(data)[dataPointIndex] === currentDate) {
      return colors.accent;
    }
    return colors.primary;
  };

  return keys.length > 0 ? (
    <LineChart
      data={{
        labels: keys,
        datasets: [
          {
            data: values,
          },
        ],
      }}
      width={width || screenWidth}
      height={height || screenHeight}
      yAxisSuffix="kg"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: colors.backdrop,
        backgroundGradientTo: colors.primary,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: colors.primary,
        },
      }}
      bezier
      onDataPointClick={onPointClick}
      getDotColor={getDotColor}
    />
  ) : (
    <Text>Add your weight to view data</Text>
  );
}
