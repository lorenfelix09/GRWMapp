import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import theme from '../../theme';

export default function GRWMHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  rightLabel = '+',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
          <Pressable
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.back}>
              ‹
            </Text>
          </Pressable>
        )}

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightAction && (
        <Pressable
          onPress={rightAction}
          style={styles.action}
        >
          <Text style={styles.actionText}>
            {rightLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    marginRight: theme.spacing.md,
  },

  back: {
    color: theme.colors.textPrimary,
    fontSize: 36,
    lineHeight: 36,
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginTop: 3,
  },

  action: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '700',
  },
});
