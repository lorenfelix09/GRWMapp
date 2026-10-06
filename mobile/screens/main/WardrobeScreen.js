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
import { excluirPeca, listarPecas } from '../../services/clothingService';

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
                current.filter(
                  (piece) => piece.id !== item.id
                )
              );
            } catch (error) {
              Alert.alert(
                'Erro',
                error.message ||
                  'Não foi possível excluir a peça.'
              );
            }
          },
        },
      ]
    );
  }

  function handleSavePiece(piece) {
    setModalVisible(false);

    // O cadastro pelo Supabase será conectado aqui.
    // Por enquanto, recarrega as peças cadastradas.
    load();
  }

  const filtered = items.filter((item) => {
    const matchesCategory =
      !category || item.category === category;

    const matchesSearch =
      !search ||
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Meu closet
          </Text>

          <Text style={styles.subtitle}>
            {items.length} peça(s) cadastrada(s)
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

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>
              Categorias
            </Text>

            <FlatList
              horizontal
              data={[
                null,
                ...CLOTHING_CATEGORIES,
              ]}
              keyExtractor={(item) =>
                item || 'all'
              }
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.category,
                    category === item &&
                      styles.selectedCategory,
                  ]}
                  onPress={() =>
                    setCategory(item)
                  }
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
          </>
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
                Seu closet está vazio
              </Text>

              <Text style={styles.emptyText}>
                Adicione suas roupas para começar
                a montar seus looks.
              </Text>

              <Pressable
                style={styles.emptyButton}
                onPress={() =>
                  setModalVisible(true)
                }
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={COLORS.white}
                />

                <Text
                  style={styles.emptyButtonText}
                >
                  Adicionar peça
                </Text>
              </Pressable>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onLongPress={() =>
              confirmDelete(item)
            }
          >
            {item.image_url ? (
              <Image
                source={{
                  uri: item.image_url,
                }}
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
        )}
      />

      <GRWMModal
        visible={modalVisible}
        onClose={() =>
          setModalVisible(false)
        }
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
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 12,
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
