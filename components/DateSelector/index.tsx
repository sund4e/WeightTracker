import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { moveDate, getDateFromDateString } from '../../utils';

export default function DateSelector({
  currentDate,
  setDate,
}: {
  currentDate: string;
  setDate: (newDate: string) => void;
}) {
  const nextDate = () => {
    setDate(moveDate(1, currentDate));
  };

  const previousDate = () => {
    setDate(moveDate(-1, currentDate));
  };

  return (
    <Appbar.Header>
      <Appbar.Action icon="arrow-left" onPress={previousDate} />
      <Appbar.Content title={currentDate} style={styles.content} />
      {getDateFromDateString(currentDate) < getDateFromDateString() && (
        <Appbar.Action icon="arrow-right" onPress={nextDate} />
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
});
