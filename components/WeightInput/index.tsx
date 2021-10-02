import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Surface, Button } from 'react-native-paper';

export default function WeightInput({
  onSubmit,
}: {
  onSubmit: (weight: number) => void;
}) {
  const [weight, setWeight] = useState<string>();

  return (
    <Surface style={styles.surface}>
      <TextInput
        mode="outlined"
        label="Weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={(weight) => setWeight(weight)}
      />
      <Button
        icon="check"
        mode="contained"
        style={styles.button}
        disabled={!(weight && parseFloat(weight))}
        onPress={() => weight && onSubmit(parseFloat(weight))}
      >
        Save
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    margin: 10,
    flexGrow: 1,
  },
  button: {
    marginTop: 10,
  },
});
