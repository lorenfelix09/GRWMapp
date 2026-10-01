import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Favoritos
        </Text>

        <Text style={styles.subtitle}>
          Tudo que você salvou
        </Text>

        <View style={styles.empty}>
          <Text style={styles.icon}>
            ♡
          </Text>

          <Text style={styles.emptyTitle}>
            Nada salvo ainda
          </Text>

          <Text style={styles.emptyText}>
            Suas peças e looks favoritos
            aparecerão aqui.
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
    color: COLORS.primary,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.secondaryText,
  },
});
