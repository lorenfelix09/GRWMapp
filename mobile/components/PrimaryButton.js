import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
}) {
  const isOutline = variant === 'outline';
  const isOutlineDark = variant === 'outlineDark';

  return (
    <TouchableOpacity
      style={[
        styles.button,

        isOutline && styles.outlineButton,

        isOutlineDark && styles.outlineDarkButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,

          isOutline && styles.outlineText,

          isOutlineDark && styles.outlineDarkText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.white,
  },

  outlineDarkButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.background,
  },

  text: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },

  outlineText: {
    color: COLORS.white,
  },

  outlineDarkText: {
    color: COLORS.background,
  },
});