import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';

import { TextInput, Text } from '../components';
import { Style } from '../theme';

export const MeasurementView = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ borderWidth: 5, borderColor: 'red', height: 200 }}
      >
        <View style={styles.inner}>
          <Text>Add weight</Text>
          <TextInput keyboardType="numeric" />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = Style.create((theme) => ({
  container: {
    height: '100%',
  },
  inner: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
}));
