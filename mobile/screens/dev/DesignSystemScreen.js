import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GRWMButton from '../../components/ui/GRWMButton';
import GRWMInput from '../../components/ui/GRWMInput';
import GRWMCard from '../../components/ui/GRWMCard';
import GRWMHeader from '../../components/ui/GRWMHeader';
import GRWMChip from '../../components/ui/GRWMChip';
import GRWMModal from '../../components/ui/GRWMModal';

import theme from '../../theme';

export default function DesignSystemScreen() {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('Todas');
  const [modalVisible, setModalVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <GRWMHeader
        title="GRWM Design System"
        subtitle="Componentes reutilizáveis"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          Botões
        </Text>

        <GRWMButton
          title="Botão principal"
          onPress={() => {}}
        />

        <View style={styles.space} />

        <GRWMButton
          title="Botão secundário"
          variant="secondary"
          onPress={() => {}}
        />

        <View style={styles.space} />

        <GRWMButton
          title="Botão outline"
          variant="outline"
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>
          Input
        </Text>

        <GRWMInput
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.sectionTitle}>
          Categorias
        </Text>

        <View style={styles.chips}>
          <GRWMChip
            label="Todas"
            selected={selected === 'Todas'}
            onPress={() => setSelected('Todas')}
          />

          <GRWMChip
            label="Roupas"
            selected={selected === 'Roupas'}
            onPress={() => setSelected('Roupas')}
          />

          <GRWMChip
            label="Calçados"
            selected={selected === 'Calçados'}
            onPress={() => setSelected('Calçados')}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Card
        </Text>

        <GRWMCard>
          <Text style={styles.cardTitle}>
            Meu card GRWM
          </Text>

          <Text style={styles.cardText}>
            Esse componente poderá ser utilizado
            em várias telas do aplicativo.
          </Text>
        </GRWMCard>

        <Text style={styles.sectionTitle}>
          Modal
        </Text>

        <GRWMButton
          title="Abrir modal"
          onPress={() => setModalVisible(true)}
        />

        <GRWMModal
          visible={modalVisible}
          title="Exemplo de modal"
          message="Esse modal faz parte do Design System do GRWM."
          onClose={() => setModalVisible(false)}
          onConfirm={() => setModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  },

  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '700',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },

  space: {
    height: theme.spacing.md,
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cardTitle: {
    color: theme.colors.textDark,
    fontSize: 17,
    fontWeight: '700',
  },

  cardText: {
    color: '#6F5750',
    fontSize: 14,
    lineHeight: 20,
    marginTop: theme.spacing.sm,
  },
});
