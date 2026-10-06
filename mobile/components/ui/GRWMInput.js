import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import theme from '../../theme';

export default function GRWMInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },

  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: theme.typography.bodyMedium.fontWeight,
    marginBottom: theme.spacing.sm,
  },

  input: {
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.textDark,
    fontSize: theme.typography.body.fontSize,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: theme.colors.danger,
  },

  error: {
    color: '#E58B8B',
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
});
