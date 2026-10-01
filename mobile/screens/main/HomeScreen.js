import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>GRWM</Text>
            <Text style={styles.greeting}>
              Oi, Loren!
            </Text>
            <Text style={styles.question}>
              Que tal montar um look hoje?
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text>👤</Text>
          </View>
        </View>

        <View style={styles.search}>
          <Text>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar roupas, looks, ocasiões..."
            placeholderTextColor={COLORS.muted}
          />
        </View>

        <View style={styles.actions}>

          <QuickAction
            icon="👕"
            title="Meu guarda-roupa"
          />

          <QuickAction
            icon="✨"
            title="Looks"
          />

          <QuickAction
            icon="♡"
            title="Favoritos"
          />

          <QuickAction
            icon="🧳"
            title="Viagem"
          />

        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Looks em destaque
          </Text>

          <Text style={styles.seeAll}>
            Ver todos ›
          </Text>
        </View>

        <View style={styles.lookGrid}>

          <LookCard title="Dia a dia" icon="👗" />
          <LookCard title="Trabalho" icon="🧥" />
          <LookCard title="Jantar" icon="👠" />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, title }) {
  return (
    <TouchableOpacity style={styles.action}>
      <Text style={styles.actionIcon}>
        {icon}
      </Text>

      <Text style={styles.actionText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function LookCard({ title, icon }) {
  return (
    <TouchableOpacity style={styles.lookCard}>
      <View style={styles.lookImage}>
        <Text style={styles.lookIcon}>
          {icon}
        </Text>
      </View>

      <Text style={styles.lookTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.primary,
  },

  greeting: {
    marginTop: 16,
    fontSize: 23,
    fontWeight: '700',
    color: COLORS.text,
  },

  question: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginTop: 22,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: COLORS.white,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.text,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },

  action: {
    flex: 1,
    minHeight: 92,
    padding: 8,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  actionIcon: {
    fontSize: 22,
  },

  actionText: {
    marginTop: 7,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.text,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.text,
  },

  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
  },

  lookGrid: {
    flexDirection: 'row',
    gap: 10,
  },

  lookCard: {
    flex: 1,
  },

  lookImage: {
    height: 170,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.placeholder,
  },

  lookIcon: {
    fontSize: 45,
  },

  lookTitle: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
});