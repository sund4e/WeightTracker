import React, { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';

import { Card, Button } from './components';
import Chart from './components/Chart';
import { Style } from './theme';
import { BottomSheet } from './views/bottomSheet';
import { MeasurementView } from './views/measurementView';
import { addWeight, getWeights, WeightData } from './weights';

export default function App() {
  const [data, setData] = useState<WeightData>(getWeights());
  const [date, setDate] = useState(new Date().toDateString());
  const bottomSheetRef = useRef<any>(null);
  const onSubmitWeight = (weight: number) => {
    addWeight(weight, date);
    setData(getWeights());
  };

  const onPressButton = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <Card>
        <Chart data={data} currentDate={date} setDate={setDate} height={700} />
      </Card>
      <View style={styles.bottomContainer}>
        <Button onPress={onPressButton}>+</Button>
      </View>
      <BottomSheet ref={bottomSheetRef}>
        <MeasurementView />
      </BottomSheet>
    </View>
  );
}

const styles = Style.create((theme) => ({
  container: {
    paddingVertical: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.color.dark,
  },
  bottomContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: Dimensions.get('window').width,
  },
}));
