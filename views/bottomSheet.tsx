import {
  default as RNBottomSheet,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Style } from '../theme';

export type BottomSheetType = RNBottomSheet;

export const BottomSheet = React.forwardRef<
  RNBottomSheet,
  Omit<BottomSheetProps, 'snapPoints'>
>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { children, ...rest } = props;

  return (
    <RNBottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={(prp) => console.log('change', prp)}
      enablePanDownToClose
      backgroundStyle={styles.background}
      keyboardBlurBehavior="restore"
      {...rest}
    >
      <View>{children}</View>
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
