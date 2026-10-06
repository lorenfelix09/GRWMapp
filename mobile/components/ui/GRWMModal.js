import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import theme from '../../theme';

export default function GRWMModal({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },

  container: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
  },

  title: {
    color: theme.colors.textDark,
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '700',
  },

  message: {
    color: '#6F5750',
    fontSize: theme.typography.body.fontSize,
    lineHeight: 21,
    marginTop: theme.spacing.md,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.xl,
  },

  cancelButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },

  cancelText: {
    color: theme.colors.textDark,
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: '600',
  },

  confirmButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },

  confirmText: {
    color: theme.colors.white,
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: '700',
  },
});
