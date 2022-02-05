import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useTheme, Style } from '../../theme';
import { WeightData } from '../../weights';
import { Text } from '../Text/Text';
import { Tooltip } from './Tooltip';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.75;

function arrayFromRange(min: number, max: number): number[] {
  const len = max - min + 1;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = min + i;
  }
  return arr;
}

const YAxis = ({
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
        <Text key={`yLabel-${index}`}>{value.toString()}</Text>
      ))}
    </View>
  );
};

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

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const chartConfig = {
    backgroundGradientFrom: color.dark,
    backgroundGradientTo: color.primary,
    backgroundGradientToOpacity: 0,
    backgroundGradientFromOpacity: 0,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: color.primary,
    },
  };

  const chartHeight = height || screenHeight;

  return keys.length > 0 ? (
    <View style={styles.container}>
      <YAxis
        maxValue={maxValue}
        minValue={minValue}
        chartHeight={chartHeight}
      />
      <ScrollView
        horizontal
        // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
        showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        <LineChart
          data={{
            labels: keys,
            datasets: [
              {
                data: values,
              },
              {
                data: [minValue], //Min Y value for chart
                withDots: false,
              },
              {
                data: [maxValue], // MaxY for chart
                withDots: false,
              },
            ],
          }}
          decorator={() => <Tooltip />}
          width={(keys.length * (width || screenWidth)) / 7}
          height={chartHeight}
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          withHorizontalLabels={false} // We render Y axis outside chart to enable horizontal scrolling
          bezier
          onDataPointClick={onPointClick}
          getDotColor={getDotColor}
          style={{
            paddingRight: 0, // Remove white space from right side
            paddingTop: 6, // position chart correctly relative to Y axis
          }}
          segments={5}
        />
      </ScrollView>
    </View>
  ) : (
    <Text>Add your weight to view data</Text>
  );
}

const styles = Style.create((theme) => ({
  container: {
    flexDirection: 'row',
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: theme.spacing.small,
  },
}));
