import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import theme from '../../theme';

export default function GRWMCard({
  children,
  onPress,
  variant = 'light',
}) {
  const dark = variant === 'dark';

  const content = (
    <View
      style={[
        styles.card,
        dark && styles.darkCard,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed && styles.pressed
        }
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },

  darkCard: {
    backgroundColor: theme.colors.surfaceDark,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  pressed: {
    opacity: 0.8,
  },
});
