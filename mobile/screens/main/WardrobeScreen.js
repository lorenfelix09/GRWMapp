import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default function WardrobeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Meu guarda-roupa
        </Text>

        <Text style={styles.subtitle}>
          Organize suas peças
        </Text>

        <View style={styles.categories}>
          <Category title="Blusas" icon="👕" />
          <Category title="Calças" icon="👖" />
          <Category title="Saias" icon="👗" />
          <Category title="Vestidos" icon="👗" />
          <Category title="Sapatos" icon="👟" />
          <Category title="Acessórios" icon="👜" />
        </View>

      </View>
    </SafeAreaView>
  );
}

function Category({ title, icon }) {
  return (
    <View style={styles.category}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.categoryTitle}>{title}</Text>
    </View>
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

  categories: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  category: {
    width: '31%',
    minHeight: 120,
    padding: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  icon: {
    fontSize: 34,
  },

  categoryTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
});
