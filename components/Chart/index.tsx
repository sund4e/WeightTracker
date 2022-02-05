import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useTheme, Style } from '../../theme';
import { WeightData } from '../../weights';
import { Text } from '../Text/Text';
import { Tooltip } from './Tooltip';
import { YAxis } from './YAxis';

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
  const valuesVisible = 7;
  const chartWidth = (keys.length * (width || screenWidth)) / valuesVisible;
  const yAxisInterval = 1;

  return keys.length > 0 ? (
    <View style={styles.container}>
      <YAxis
        maxValue={maxValue}
        minValue={minValue}
        chartHeight={chartHeight}
      />
      <ScrollView
        horizontal
        contentOffset={{ x: chartWidth - 0.5 * (width || screenWidth), y: 0 }} // start scrolling from the end not the start
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
          width={chartWidth}
          height={chartHeight}
          yAxisInterval={yAxisInterval}
          chartConfig={chartConfig}
          withHorizontalLabels={false} // We render Y axis outside chart to enable horizontal scrolling
          bezier
          onDataPointClick={onPointClick}
          getDotColor={getDotColor}
          style={{
            paddingRight: 12, // Remove white space from right side
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
}));
