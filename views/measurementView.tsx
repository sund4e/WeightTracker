import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { TextInput, Text, Button } from '../components';
import { Style } from '../theme';

export const MeasurementView = ({
  onSave,
}: {
  onSave: (wight: number) => void;
  onClose: () => void;
}) => {
  const [weight, setWeight] = useState<number>();
  const sheet = useBottomSheet();

  const close = async () => {
    await Keyboard.dismiss();
    setTimeout(() => {
      sheet.close();
    }, 10);
  };

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
          <View>
            <Text>Add weight</Text>
            <TextInput
              keyboardType="numeric"
              value={weight?.toString()}
              onChange={({ nativeEvent }) =>
                setWeight(parseFloat(nativeEvent.text))
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button preset="ghost" onPress={() => close()}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                if (weight) {
                  onSave(weight);
                  close();
                }
              }}
            >
              Save
            </Button>
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
