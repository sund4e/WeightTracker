import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useTheme } from '../../theme';
import { WeightData } from '../../weights';
import { Text } from '../Text/Text';

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
  const { color } = useTheme();
  const keys = Object.keys(data).map(
    (date) => `${new Date(date).getDate()}/${new Date(date).getMonth()}`
  );
  const values = Object.values(data);

  const onPointClick = (pointData: { index: number; value: number }) => {
    setDate(Object.keys(data)[pointData.index]);
  };

  const getDotColor = (dataPoint: number, dataPointIndex: number) => {
    if (Object.keys(data)[dataPointIndex] === currentDate) {
      return color.accent;
    }
    return color.primary;
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
        backgroundGradientFrom: color.dark,
        backgroundGradientTo: color.primary,
        backgroundGradientToOpacity: 0,
        backgroundGradientFromOpacity: 0,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: color.primary,
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
