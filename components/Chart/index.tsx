import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';

import { WeightData } from '../../weights';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.75;
export default function Chart({ data }: { data: WeightData }) {
  const keys = Object.keys(data);
  const values = Object.values(data);
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
      width={width}
      height={height * 0.75}
      yAxisSuffix="kg"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={styles.chart}
    />
  ) : (
    <Text style={styles.chart}>Add your weight to view data</Text>
  );
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    margin: 10,
  },
  text: {
    width,
    height,
  },
});
