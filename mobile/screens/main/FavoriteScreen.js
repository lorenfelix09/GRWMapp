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
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';

import {
  atualizarPeca,
  listarPecas,
} from '../../services/clothingService';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);

      const items = await listarPecas();

      setFavorites(
        items.filter((item) => item.favorite === true)
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível carregar seus favoritos.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  async function refresh() {
    try {
      setRefreshing(true);

      const items = await listarPecas();

      setFavorites(
        items.filter((item) => item.favorite === true)
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível atualizar.'
      );
    } finally {
      setRefreshing(false);
    }
  }

  async function removeFavorite(item) {
    try {
      await atualizarPeca(item.id, {
        favorite: false,
      });

      setFavorites((current) =>
        current.filter((piece) => piece.id !== item.id)
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível remover dos favoritos.'
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Favoritos
          </Text>

          <Text style={styles.subtitle}>
            Suas peças favoritas
          </Text>
        </View>

        <View style={styles.heartContainer}>
          <Ionicons
            name="heart"
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>

      {/* LISTA DE FAVORITOS */}
      <FlatList
        data={favorites}
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
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={styles.loader}
            />
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="heart-outline"
                  size={42}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>
                Nada salvo ainda
              </Text>

              <Text style={styles.emptyText}>
                Suas peças favoritas aparecerão aqui.
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Wardrobe')}
                accessibilityRole="button"
              >
                <Ionicons
                  name="shirt-outline"
                  size={20}
                  color={COLORS.white}
                />

                <Text style={styles.buttonText}>
                  Ir para o closet
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
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

              {/* BOTÃO PARA DESFAVORITAR */}
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => removeFavorite(item)}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${item.name} dos favoritos`}
                hitSlop={8}
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
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
          </View>
        )}
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
    paddingBottom: 8,
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

  heartContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 30,
    flexGrow: 1,
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

  empty: {
    marginTop: 25,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
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

  button: {
    marginTop: 20,
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },

  loader: {
    marginTop: 50,
  },
});