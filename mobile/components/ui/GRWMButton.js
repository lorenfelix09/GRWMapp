import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import theme from '../../theme';

export default function GRWMButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) {
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,

        isSecondary && styles.secondaryButton,
        isOutline && styles.outlineButton,

        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isOutline || isSecondary
              ? theme.colors.primary
              : theme.colors.white
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            isSecondary && styles.secondaryText,
            isOutline && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButton: {
    backgroundColor: theme.colors.surface,
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },

  text: {
    color: theme.colors.white,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
  },

  secondaryText: {
    color: theme.colors.textDark,
  },

  outlineText: {
    color: theme.colors.surface,
  },

  pressed: {
    opacity: 0.75,
  },

  disabled: {
    opacity: 0.45,
  },
});