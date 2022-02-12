import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useEffect, useState } from 'react';
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
  savedWeight,
}: {
  onSave: (weight: number) => void;
  savedWeight: number | null;
}) => {
  const [weight, setWeight] = useState<number | null>();
  const sheet = useBottomSheet();

  const close = async () => {
    await Keyboard.dismiss();
    setTimeout(() => {
      sheet.close();
    }, 10);
  };

  useEffect(() => {
    setWeight(savedWeight);
  }, [savedWeight]);

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
              onChange={({ nativeEvent }) => {
                const newValue = nativeEvent.text;
                if (newValue.length > 0) {
                  setWeight(parseFloat(nativeEvent.text));
                } else {
                  setWeight(null);
                }
              }}
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
