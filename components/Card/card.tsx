import React, { useState } from 'react';
import { LayoutRectangle, StyleSheet, View } from 'react-native';

const spacing = 5;

export const Card = ({ children }: { children: React.ReactElement }) => {
  const [contentDimensions, setContentDimensions] = useState<LayoutRectangle>();

  return (
    <View style={styles.container}>
      <View
        onLayout={({ nativeEvent }) => {
          setContentDimensions(nativeEvent.layout);
        }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            width: contentDimensions?.width,
            heigt: contentDimensions?.height,
          });
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing,
    borderWidth: 1,
    margin: spacing,
  },
});
