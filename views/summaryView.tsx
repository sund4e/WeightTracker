import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Text } from '../components';
import { Style } from '../theme';
import { WeightData } from '../weights';

/*
 * Tiles for several things: weekly / monthly / yearly depending on chart timespan
 * - average
 * - change (aboslute & %)
 */

export const SummaryView = ({
  data,
  date,
}: {
  data: WeightData;
  date: string;
}) => {
  // console.log(data, date);
  return (
    <View style={styles.container}>
      <View>
        <Text size="large">{`${data[date]} kg`}</Text>
      </View>
    </View>
  );
};

const styles = Style.create((theme) => ({
  container: {
    borderWidth: 1,
  },
  inner: {
    flex: 1,
    padding: theme.spacing.medium,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  buttonContainer: {
    paddingVertical: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
