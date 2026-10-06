import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';
import GRWMModal from '../../components/ui/GRWMModal';

export default function WardrobeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { title: 'Blusas', icon: 'shirt-outline' },
    { title: 'Calças', icon: 'accessibility-outline' },
    { title: 'Saias', icon: 'woman-outline' },
    { title: 'Vestidos', icon: 'sparkles-outline' },
    { title: 'Sapatos', icon: 'footsteps-outline' },
    { title: 'Acessórios', icon: 'watch-outline' },
  ];

  function handleAddPiece() {
    setModalVisible(false);

    // Aqui vamos colocar depois a lógica
    // para adicionar a peça ao closet.
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Meu closet
            </Text>

            <Text style={styles.subtitle}>
              Organize suas peças
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="add"
              size={26}
              color={COLORS.white}
            />
          </Pressable>
        </View>

        {/* BUSCA */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.secondaryText}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar peça..."
            placeholderTextColor={COLORS.secondaryText}
          />
        </View>

        {/* CATEGORIAS */}
        <Text style={styles.sectionTitle}>
          Categorias
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category) => (
            <Pressable
              key={category.title}
              style={styles.category}
            >
              <View style={styles.categoryIcon}>
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.categoryTitle}>
                {category.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* MINHAS PEÇAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Minhas peças
          </Text>

          <Text style={styles.counter}>
            0 peças
          </Text>
        </View>

        {/* ESTADO VAZIO */}
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="shirt-outline"
              size={42}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            Seu closet está vazio
          </Text>

          <Text style={styles.emptyText}>
            Adicione suas roupas para começar a
            montar seus looks.
          </Text>

          <Pressable
            style={styles.emptyButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="add"
              size={20}
              color={COLORS.white}
            />

            <Text style={styles.emptyButtonText}>
              Adicionar peça
            </Text>
          </Pressable>
        </View>

      </ScrollView>

      {/* MODAL */}
      <GRWMModal
        visible={modalVisible}
        title="Adicionar peça"
        message="Deseja adicionar uma nova peça ao seu closet?"
        onClose={() => setModalVisible(false)}
        onConfirm={handleAddPiece}
        confirmText="Adicionar"
        cancelText="Cancelar"
      />

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
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    height: 48,
    marginTop: 24,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
  },

  sectionTitle: {
    marginTop: 26,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  categories: {
    paddingBottom: 4,
  },

  category: {
    width: 82,
    marginRight: 12,
    alignItems: 'center',
  },

  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },

  sectionHeader: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  counter: {
    fontSize: 13,
    color: COLORS.secondaryText,
  },

  emptyContainer: {
    marginTop: 10,
    padding: 30,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },

  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.secondaryText,
  },

  emptyButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
