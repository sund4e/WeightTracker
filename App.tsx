import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Chart from './components/Chart';
import WeightInput from './components/WeightInput';
import { addWeight, getWeights, WeightData } from './weights';

export default function App() {
  const [data, setData] = useState<WeightData>(getWeights());
  const onSubmitWeight = (weight: number) => {
    addWeight(weight);
    setData(getWeights());
  };

  return (
    <View style={styles.container}>
      <WeightInput onSubmit={onSubmitWeight} />
      <Chart data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
