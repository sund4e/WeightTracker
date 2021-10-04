import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Chart from './components/Chart';
import DateSelector from './components/DateSelector';
import WeightInput from './components/WeightInput';
import { addWeight, getWeights, WeightData } from './weights';

const theme = {
  ...DefaultTheme,
};

export default function App() {
  const [data, setData] = useState<WeightData>(getWeights());
  const [date, setDate] = useState(new Date().toDateString());
  const onSubmitWeight = (weight: number) => {
    addWeight(weight);
    setData(getWeights());
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <DateSelector currentDate={date} setDate={setDate} />
        <WeightInput onSubmit={onSubmitWeight} />
        <Chart data={data} />
      </View>
    </PaperProvider>
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
