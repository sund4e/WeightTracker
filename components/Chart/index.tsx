import React, { useState } from 'react';
import { Dimensions, ScrollView, View, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useTheme, Style } from '../../theme';
import { WeightData } from '../../weights';
import { Text } from '../Text/Text';
import { Tooltip } from './Tooltip';
import { YAxis } from './YAxis';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.75;
const FontSize = 12; // from react-native-chart-kit
const XLabelHeight = FontSize * 2;

// react-native-chart-kit draws the chart only for partial height and leave white space below
// Calculates the chart height based on the desired height so that if conteiner has height X
// the chart is drawn so that the white space is left outside of the container
// reverse engineered from here:
// https://github.com/indiespirit/react-native-chart-kit/blob/134ed05556c20e3bfdcf4b77bf32c647636d2656/src/AbstractChart.tsx#L288
export const getChartFullHeight = (height: number) => {
  return (height - XLabelHeight) / 0.75 - XLabelHeight;
};

export default function Chart({
  data,
  currentDate,
  setDate,
  width,
  height = screenHeight,
}: {
  data: WeightData;
  currentDate: string;
  setDate: (newDate: string) => void;
  width?: number;
  height?: number;
}) {
  const { color } = useTheme();
  const [tooltipLocation, setTooltipLocation] =
    useState<{ x: number; y: number }>();
  const keys = Object.keys(data).map(
    (date) => `${new Date(date).getDate()}/${new Date(date).getMonth()}`
  );
  const values = Object.values(data);

  const onPointClick = (pointData: {
    index: number;
    value: number;
    x: number;
    y: number;
    getColor: (opacity: number) => string;
  }) => {
    setDate(Object.keys(data)[pointData.index]);
    setTooltipLocation({ x: pointData.x, y: pointData.y });
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

  const chartHeight = height;
  const valuesVisible = 7;
  const chartWidth = (keys.length * (width || screenWidth)) / valuesVisible;
  const yAxisInterval = 1;

  return keys.length > 0 ? (
    <Pressable
      onPress={() => {
        setTooltipLocation(undefined);
      }}
    >
      <View
        style={{
          ...styles.container,
          height,
        }}
      >
        <YAxis
          maxValue={maxValue}
          minValue={minValue}
          chartHeight={chartHeight}
          style={{ height: height - XLabelHeight }}
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
            decorator={() =>
              tooltipLocation && (
                <Tooltip
                  {...tooltipLocation}
                  value={`${data[currentDate]} kg`}
                />
              )
            }
            width={chartWidth}
            height={getChartFullHeight(height)}
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
    </Pressable>
  ) : (
    <Text>Add your weight to view data</Text>
  );
}

const styles = Style.create((theme) => ({
  container: {
    flexDirection: 'row',
  },
}));
