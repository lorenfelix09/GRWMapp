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

import { COLORS } from '../../constants/colors';
import { CLOTHING_CATEGORIES } from '../../constants/categories';
import { excluirPeca, listarPecas } from '../../services/clothingService';

export default function WardrobeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setItems(await listarPecas());
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível carregar suas peças.');
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
      Alert.alert('Erro', error.message || 'Não foi possível atualizar.');
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(item) {
    Alert.alert('Excluir peça', `Deseja excluir "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirPeca(item.id);
            setItems((current) => current.filter((piece) => piece.id !== item.id));
          } catch (error) {
            Alert.alert('Erro', error.message || 'Não foi possível excluir a peça.');
          }
        },
      },
    ]);
  }

  const filtered = category ? items.filter((item) => item.category === category) : items;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meu guarda-roupa</Text>
          <Text style={styles.subtitle}>{items.length} peça(s) cadastrada(s)</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClothing')}>
          <Text style={styles.addButtonText}>+ Peça</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={[null, ...CLOTHING_CATEGORIES]}
            keyExtractor={(item) => item || 'all'}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.category, category === item && styles.selectedCategory]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.categoryText, category === item && styles.selectedCategoryText]}>
                  {item || 'Todas'}
                </Text>
              </TouchableOpacity>
            )}
          />
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>👕</Text>
              <Text style={styles.emptyTitle}>Seu guarda-roupa está vazio</Text>
              <Text style={styles.emptyText}>Adicione uma foto para começar a montar seu closet.</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onLongPress={() => confirmDelete(item)}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            ) : (
              <View style={styles.noImage}><Text style={styles.noImageText}>👕</Text></View>
            )}
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 27, fontWeight: '700', color: COLORS.text },
  subtitle: { marginTop: 5, color: COLORS.secondaryText },
  addButton: { backgroundColor: COLORS.primary, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11 },
  addButtonText: { color: COLORS.white, fontWeight: '700' },
  list: { padding: 20, paddingTop: 8, paddingBottom: 30 },
  categories: { gap: 8, paddingVertical: 12 },
  category: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  selectedCategory: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryText: { color: COLORS.text, fontSize: 12 },
  selectedCategoryText: { color: COLORS.white, fontWeight: '700' },
  row: { gap: 10, marginBottom: 10 },
  card: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, overflow: 'hidden', paddingBottom: 12 },
  image: { width: '100%', height: 210, resizeMode: 'cover' },
  noImage: { height: 210, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.placeholder },
  noImageText: { fontSize: 45 },
  itemName: { marginTop: 9, marginHorizontal: 10, fontWeight: '700', color: COLORS.text },
  itemCategory: { marginTop: 3, marginHorizontal: 10, fontSize: 12, color: COLORS.secondaryText },
  empty: { padding: 30, marginTop: 30, borderRadius: 20, alignItems: 'center', backgroundColor: COLORS.white },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { marginTop: 12, fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  emptyText: { marginTop: 7, textAlign: 'center', color: COLORS.secondaryText, lineHeight: 20 },
  loader: { marginTop: 50 },
});
