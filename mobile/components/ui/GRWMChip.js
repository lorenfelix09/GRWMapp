import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import theme from '../../theme';

export default function GRWMChip({
  label,
  selected = false,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.selected,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceDark,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },

  selected: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.surface,
  },

  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },

  selectedText: {
    color: theme.colors.textDark,
  },
});
