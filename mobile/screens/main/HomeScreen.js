import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import GRWMButton from '../../components/ui/GRWMButton';
import { colors, spacing, radius, typography } from '../../theme';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGO */}
        <View style={styles.header}>
          {/* Por enquanto usamos o nome como logo.
              Depois colocaremos a imagem real da logo aqui. */}

          <Text style={styles.slogan}>
            Get Ready With Me
          </Text>
        </View>

        {/* SAUDAÇÃO */}
        <View style={styles.welcome}>
          <Text style={styles.title}>
            Seu estilo começa aqui.
          </Text>

          <Text style={styles.description}>
            Organize suas roupas, monte seus looks
            e descubra novas combinações.
          </Text>
        </View>

        {/* AÇÕES PRINCIPAIS */}
        <View style={styles.actions}>
          <GRWMButton
            title="Meu guarda-roupa"
            icon="shirt-outline"
            onPress={() => navigation.navigate('Wardrobe')}
          />

          <GRWMButton
            title="Criar meu look"
            icon="sparkles-outline"
            onPress={() => navigation.navigate('Looks')}
          />

          <GRWMButton
            title="Meu perfil"
            icon="person-outline"
            variant="outline"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>

        {/* DICA */}
        <View style={styles.tip}>
          <View style={styles.tipIcon}>
            <Ionicons
              name="bulb-outline"
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Dica do GRWM
            </Text>

            <Text style={styles.tipText}>
              Experimente combinar peças que você
              normalmente não usaria juntas.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },


  slogan: {
    color: colors.secondary,
    fontSize: typography.small,
    marginTop: spacing.xs,
    letterSpacing: 1,
  },

  welcome: {
    marginBottom: spacing.xl,
  },

  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },

  description: {
    color: colors.textLight,
    fontSize: typography.body,
    lineHeight: 24,
  },

  actions: {
    gap: spacing.md,
  },

  tip: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
    marginBottom: 4,
  },

  tipText: {
    color: colors.textLight,
    fontSize: typography.small,
    lineHeight: 20,
  },
});
