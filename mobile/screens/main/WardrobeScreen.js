import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  TextInput,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';
import { CLOTHING_CATEGORIES } from '../../constants/categories';

import {
  atualizarPeca,
  criarPecaComImagem,
  excluirPeca,
  listarPecas,
} from '../../services/clothingService';

import GRWMModal from '../../components/ui/GRWMModal';

export default function WardrobeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setItems(await listarPecas());
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível carregar suas peças.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  async function refresh() {
    try {
      setRefreshing(true);
      setItems(await listarPecas());
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível atualizar.'
      );
    } finally {
      setRefreshing(false);
    }
  }

  async function toggleFavorite(item) {
    const previousFavorite = item.favorite === true;
    const newFavorite = !previousFavorite;

    // Atualiza o coração imediatamente na tela.
    setItems((current) =>
      current.map((piece) =>
        piece.id === item.id
          ? { ...piece, favorite: newFavorite }
          : piece
      )
    );

    try {
      await atualizarPeca(item.id, {
        favorite: newFavorite,
      });
    } catch (error) {
      // Restaura o estado anterior se o salvamento falhar.
      setItems((current) =>
        current.map((piece) =>
          piece.id === item.id
            ? { ...piece, favorite: previousFavorite }
            : piece
        )
      );

      Alert.alert(
        'Erro',
        error.message || 'Não foi possível atualizar o favorito.'
      );
    }
  }

  function confirmDelete(item) {
    Alert.alert(
      'Excluir peça',
      `Deseja excluir "${item.name}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirPeca(item.id);

              setItems((current) =>
                current.filter((piece) => piece.id !== item.id)
              );
            } catch (error) {
              Alert.alert(
                'Erro',
                error.message || 'Não foi possível excluir a peça.'
              );
            }
          },
        },
      ]
    );
  }

  async function handleSavePiece(piece) {
    try {
      await criarPecaComImagem(
        {
          name: piece.name,
          category: piece.category,
          color: piece.color,
          favorite: piece.favorite || false,
        },
        piece.image
      );

      setModalVisible(false);
      await load();
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível salvar a peça.'
      );
    }
  }

  const filtered = items.filter((item) => {
    const matchesCategory =
      !category || item.category === category;

    const matchesSearch =
      !search ||
      item.name?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meu closet</Text>

          <Text style={styles.subtitle}>
            {items.length} peça(s) cadastrada(s)
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Adicionar peça"
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
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LISTA DE PEÇAS */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionTitle}>
              Categorias
            </Text>

            <FlatList
              horizontal
              data={[null, ...CLOTHING_CATEGORIES]}
              keyExtractor={(item) => item || 'all'}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.category,
                    category === item && styles.selectedCategory,
                  ]}
                  onPress={() => setCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {item || 'Todas'}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Minhas peças
              </Text>

              <Text style={styles.counter}>
                {filtered.length} peças
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={styles.loader}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="shirt-outline"
                  size={42}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>
                {items.length === 0
                  ? 'Seu closet está vazio'
                  : 'Nenhuma peça encontrada'}
              </Text>

              <Text style={styles.emptyText}>
                {items.length === 0
                  ? 'Adicione suas roupas para começar a montar seus looks.'
                  : 'Tente mudar a busca ou selecionar outra categoria.'}
              </Text>

              {items.length === 0 && (
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
              )}
            </View>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.85}
              onLongPress={() => confirmDelete(item)}
              accessibilityLabel={`${item.name}. Pressione e segure para excluir.`}
            >
              <View style={styles.imageContainer}>
                {item.image_url ? (
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.noImage}>
                    <Ionicons
                      name="shirt-outline"
                      size={42}
                      color={COLORS.primary}
                    />
                  </View>
                )}
              </View>

              <Text
                style={styles.itemName}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text style={styles.itemCategory}>
                {item.category}
              </Text>
            </TouchableOpacity>

            {/* BOTÃO DE FAVORITO */}
            <Pressable
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(item)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                item.favorite
                  ? `Remover ${item.name} dos favoritos`
                  : `Adicionar ${item.name} aos favoritos`
              }
            >
              <Ionicons
                name={
                  item.favorite ? 'heart' : 'heart-outline'
                }
                size={20}
                color={
                  item.favorite ? COLORS.primary : COLORS.text
                }
              />
            </Pressable>
          </View>
        )}
      />

      {/* MODAL PARA ADICIONAR PEÇA */}
      <GRWMModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePiece}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginHorizontal: 20,
    marginTop: 18,
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

  list: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 30,
    flexGrow: 1,
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  categories: {
    gap: 8,
    paddingVertical: 8,
  },

  category: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    color: COLORS.text,
    fontSize: 12,
  },

  selectedCategoryText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  sectionHeader: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  counter: {
    fontSize: 13,
    color: COLORS.secondaryText,
  },

  row: {
    gap: 10,
    marginBottom: 10,
  },

  card: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 12,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },

  noImage: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 3,
  },

  itemName: {
    marginTop: 9,
    marginHorizontal: 10,
    fontWeight: '700',
    color: COLORS.text,
  },

  itemCategory: {
    marginTop: 3,
    marginHorizontal: 10,
    fontSize: 12,
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
    textAlign: 'center',
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

  loader: {
    marginTop: 50,
  },
});