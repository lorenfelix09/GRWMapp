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
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';
import { excluirLook, listarLooks } from '../../services/lookService';

export default function LooksScreen() {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setLooks(await listarLooks());
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível carregar seus looks.'
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
      setLooks(await listarLooks());
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível atualizar.'
      );
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(look) {
    Alert.alert(
      'Excluir look',
      'Deseja excluir este look?',
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
              await excluirLook(look.id);

              setLooks((current) =>
                current.filter(
                  (item) => item.id !== look.id
                )
              );
            } catch (error) {
              Alert.alert(
                'Erro',
                error.message ||
                  'Não foi possível excluir o look.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Meus looks
          </Text>

          <Text style={styles.subtitle}>
            Suas combinações salvas
          </Text>
        </View>

        <Pressable style={styles.addButton}>
          <Ionicons
            name="add"
            size={26}
            color={COLORS.white}
          />
        </Pressable>
      </View>

      {/* LISTA */}
      <FlatList
        data={looks}
        keyExtractor={(item) => String(item.id)}
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
                  name="sparkles-outline"
                  size={42}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>
                Seus looks aparecerão aqui
              </Text>

              <Text style={styles.emptyText}>
                Monte combinações usando as peças
                do seu closet.
              </Text>

              <Pressable style={styles.emptyButton}>
                <Ionicons
                  name="add"
                  size={20}
                  color={COLORS.white}
                />

                <Text style={styles.emptyButtonText}>
                  Criar look
                </Text>
              </Pressable>
            </View>
          )
        }
        renderItem={({ item }) => {
          const pieces = (item.look_items || [])
            .map(
              (relation) =>
                relation.clothing_items
            )
            .filter(Boolean);

          return (
            <TouchableOpacity
              style={styles.lookCard}
              onLongPress={() =>
                confirmDelete(item)
              }
              activeOpacity={0.85}
            >
              {/* IMAGENS */}
              <View style={styles.images}>
                {pieces.length > 0 ? (
                  pieces
                    .slice(0, 4)
                    .map((piece) => (
                      <View
                        key={piece.id}
                        style={styles.imageBox}
                      >
                        {piece.image_url ? (
                          <Image
                            source={{
                              uri: piece.image_url,
                            }}
                            style={styles.image}
                          />
                        ) : (
                          <Ionicons
                            name="shirt-outline"
                            size={35}
                            color={COLORS.primary}
                          />
                        )}
                      </View>
                    ))
                ) : (
                  <View style={styles.noPieces}>
                    <Ionicons
                      name="shirt-outline"
                      size={45}
                      color={COLORS.primary}
                    />

                    <Text style={styles.noPiecesText}>
                      Nenhuma peça
                    </Text>
                  </View>
                )}
              </View>

              {/* INFORMAÇÕES */}
              <View style={styles.lookInfo}>
                <View style={styles.lookTitleRow}>
                  <Text
                    style={styles.lookTitle}
                    numberOfLines={1}
                  >
                    {item.occasion || 'Look'}
                  </Text>

                  <Ionicons
                    name="heart-outline"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.lookMeta}>
                  {[
                    item.style,
                    item.weather,
                  ]
                    .filter(Boolean)
                    .join(' • ')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
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

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },

  lookCard: {
    marginBottom: 16,
    borderRadius: 18,
    padding: 12,
    backgroundColor: COLORS.white,
  },

  images: {
    flexDirection: 'row',
    gap: 7,
  },

  imageBox: {
    flex: 1,
    height: 145,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.placeholder,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  noPieces: {
    width: '100%',
    height: 145,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  noPiecesText: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.secondaryText,
  },

  lookInfo: {
    paddingHorizontal: 2,
  },

  lookTitleRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  lookTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },

  lookMeta: {
    marginTop: 4,
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

  emptyButton: {
    marginTop: 20,
    height: 46,
    paddingHorizontal: 22,
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
