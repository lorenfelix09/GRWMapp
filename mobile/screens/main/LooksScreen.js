import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default function LooksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Meus looks
        </Text>

        <Text style={styles.subtitle}>
          Suas combinações favoritas
        </Text>

        <View style={styles.empty}>
          <Text style={styles.icon}>
            ✨
          </Text>

          <Text style={styles.emptyTitle}>
            Seus looks aparecerão aqui
          </Text>

          <Text style={styles.emptyText}>
            Monte combinações usando as peças
            do seu guarda-roupa.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 5,
    color: COLORS.secondaryText,
  },

  empty: {
    marginTop: 35,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  icon: {
    fontSize: 50,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.secondaryText,
  },
});
