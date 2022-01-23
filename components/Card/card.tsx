import React, { useState } from 'react';
import { LayoutRectangle, View } from 'react-native';

import { Style } from '../../theme';

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

const styles = Style.create((theme) => ({
  container: {
    padding: theme.spacing.medium,
    borderWidth: 1,
    margin: theme.spacing.small,
    borderRadius: 10,
    backgroundColor: theme.color.surface,
    borderColor: theme.color.secondary,
    shadowColor: theme.color.shadow,
  },
}));
