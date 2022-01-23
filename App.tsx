import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from './components';
import Chart from './components/Chart';
import { Style } from './theme';
import { addWeight, getWeights, WeightData } from './weights';

export default function App() {
  const [data, setData] = useState<WeightData>(getWeights());
  const [date, setDate] = useState(new Date().toDateString());
  const onSubmitWeight = (weight: number) => {
    addWeight(weight, date);
    setData(getWeights());
  };

  return (
    <View style={styles.container}>
      <Card>
        <Chart data={data} currentDate={date} setDate={setDate} height={500} />
      </Card>
    </View>
  );
}

const styles = Style.create((theme) => ({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.color.dark,
  },
}));
