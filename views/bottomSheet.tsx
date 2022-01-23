import { default as RNBottomSheet } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Style } from '../theme';

export const BottomSheet = React.forwardRef<
  RNBottomSheet,
  { children: React.ReactElement }
>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <RNBottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={() => console.log('change')}
      enablePanDownToClose
      backgroundStyle={styles.background}
    >
      <View>{props.children}</View>
    </RNBottomSheet>
  );
});

const styles = Style.create((theme) => ({
  background: {
    backgroundColor: theme.color.surface,
    borderColor: theme.color.secondary,
    borderWidth: 1,
  },
}));
