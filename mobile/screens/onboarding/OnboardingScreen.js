import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';

const pages = [
  {
    number: '1/3',
    title: 'Organize\no seu guarda-roupa',
    description:
      'Tenha todas as suas roupas em um só lugar e nunca mais se perca no que tem.',
    icon: '👗',
  },
  {
    number: '2/3',
    title: 'Crie looks\ncom facilidade',
    description:
      'Descubra combinações, salve seus favoritos e monte looks para qualquer ocasião.',
    icon: '✨',
  },
  {
    number: '3/3',
    title: 'Planeje suas\nroupas e viagens',
    description:
      'Organize o que levar e aproveite cada momento sem esquecer suas peças.',
    icon: '🧳',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = React.useState(0);

  const page = pages[currentPage];

  function next() {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.replace('Login');
    }
  }

  function back() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.top}>
          <Text style={styles.number}>
            {page.number}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.skip}>
              Pular
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>

          <Text style={styles.title}>
            {page.title}
          </Text>

          <Text style={styles.description}>
            {page.description}
          </Text>

          <View style={styles.visual}>
            <Text style={styles.visualIcon}>
              {page.icon}
            </Text>

            <View style={styles.visualCard} />
          </View>

        </View>

        <View style={styles.bottom}>

          <View style={styles.dots}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentPage && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <View style={styles.actions}>

            {currentPage > 0 ? (
              <TouchableOpacity onPress={back}>
                <Text style={styles.back}>
                  Voltar
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            <PrimaryButton
              title={
                currentPage === pages.length - 1
                  ? 'Começar'
                  : 'Próximo'
              }
              onPress={next}
            />

          </View>

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
    flex: 1,
    padding: 24,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  number: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },

  skip: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
  },

  description: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: COLORS.secondaryText,
  },

  visual: {
    height: 240,
    marginTop: 30,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  visualCard: {
    position: 'absolute',
    width: 150,
    height: 190,
    borderRadius: 20,
    backgroundColor: COLORS.placeholder,
  },

  visualIcon: {
    zIndex: 2,
    fontSize: 64,
  },

  bottom: {
    paddingBottom: 8,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },

  activeDot: {
    width: 20,
    backgroundColor: COLORS.primary,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  back: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});