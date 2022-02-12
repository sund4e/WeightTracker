import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import { TextInputProps, StyleSheet, View, Text } from 'react-native';

import { Style } from '../../theme';

export const TextInput = ({ style, ...rest }: TextInputProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <BottomSheetTextInput
          style={StyleSheet.compose(styles.textInput, style)}
          {...rest}
        />
      </View>
      <View style={{ ...styles.textInput, ...styles.inner, ...styles.unit }}>
        <Text style={{ ...styles.textInput }}>KG</Text>
      </View>
    </View>
  );
};

const styles = Style.create((theme) => ({
  wrapper: {
    borderWidth: 1,
    borderRadius: theme.spacing.small,
    backgroundColor: theme.color.secondary,
    borderColor: theme.color.accent,
    marginVertical: theme.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inner: {
    padding: theme.spacing.small,
    flex: 1,
  },
  textInput: {
    fontSize: theme.font.medium,
    color: theme.color.text,
  },
  unit: {
    backgroundColor: theme.color.shadow,
    borderTopEndRadius: theme.spacing.small,
    borderBottomEndRadius: theme.spacing.small,
    flex: 0,
  },
}));
