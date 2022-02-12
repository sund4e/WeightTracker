import React, { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';

import EditIcon from './assets/icons/edit.svg';
import PlusIcon from './assets/icons/plus.svg';
import { Card, Button } from './components';
import Chart from './components/Chart';
import { Style, useTheme } from './theme';
import { BottomSheet, BottomSheetType } from './views/bottomSheet';
import { MeasurementView } from './views/measurementView';
import { SummaryView } from './views/summaryView';
import { addWeight, getWeights, WeightData } from './weights';

export default function App() {
  const { color } = useTheme();
  const [data, setData] = useState<WeightData>(getWeights());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const onSubmitWeight = (weight: number) => {
    if (!selectedIndex) {
      addWeight(weight, new Date().toDateString());
    } else {
      const selectedDate = Object.keys(data)[selectedIndex];
      addWeight(weight, selectedDate);
    }
    setData(getWeights());
  };

  const onPressButton = () => {
    bottomSheetRef.current?.expand();
  };

  const onChangeBottomSheet = (index: number) => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  const onClickMainView = () => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close();
      return true;
    }
    return false;
  };

  const Icon = selectedIndex === null ? PlusIcon : EditIcon;

  return (
    <View style={styles.view}>
      <View
        style={styles.container}
        onStartShouldSetResponderCapture={onClickMainView}
      >
        <Card>
          <Chart
            data={data}
            selectedIndex={selectedIndex}
            onChangeSelectedIndex={setSelectedIndex}
          />
        </Card>
        <View style={styles.bottomContainer}>
          <Button onPress={onPressButton} style={styles.button}>
            <Icon color={color.text} />
          </Button>
        </View>
      </View>
      <BottomSheet ref={bottomSheetRef} onChange={onChangeBottomSheet}>
        <MeasurementView
          onSave={onSubmitWeight}
          savedWeight={
            selectedIndex ? data[Object.keys(data)[selectedIndex]] : null
          }
        />
      </BottomSheet>
    </View>
  );
}

const styles = Style.create((theme) => ({
  view: {
    flex: 1,
  },
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
  button: {
    borderRadius: 100,
    height: 60,
    width: 60,
    padding: theme.spacing.medium,
    flexGrow: 0,
    flexShrink: 0,
  },
}));
