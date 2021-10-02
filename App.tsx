import React from 'react';
import { StyleSheet, View } from 'react-native';

import WeightInput from './components/WeightInput';
import { addWeight, getWeights } from './weights';

export default function App() {
  const onSubmitWeight = (weight: number) => {
    addWeight(weight);
    console.log(getWeights());
  };
  return (
    <View style={styles.container}>
      <WeightInput onSubmit={onSubmitWeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
