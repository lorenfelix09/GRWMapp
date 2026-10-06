import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  colors,
  spacing,
  radius,
  typography,
} from '../../theme';

export default function GRWMButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.outline : styles.primary,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={isOutline ? colors.primary : colors.white}
        />
      )}

      <Text
        style={[
          styles.text,
          isOutline ? styles.outlineText : styles.primaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },

  primary: {
    backgroundColor: colors.primary,
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  primaryText: {
    color: colors.white,
    fontSize: typography.button,
    fontWeight: '700',
  },

  outlineText: {
    color: colors.primary,
    fontSize: typography.button,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.5,
  },
});
