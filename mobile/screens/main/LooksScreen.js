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
      Alert.alert('Erro', error.message || 'Não foi possível carregar seus looks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function refresh() {
    try {
      setRefreshing(true);
      setLooks(await listarLooks());
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível atualizar.');
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(look) {
    Alert.alert('Excluir look', 'Deseja excluir este look?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirLook(look.id);
            setLooks((current) => current.filter((item) => item.id !== look.id));
          } catch (error) {
            Alert.alert('Erro', error.message || 'Não foi possível excluir o look.');
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus looks</Text>
        <Text style={styles.subtitle}>Suas combinações salvas</Text>
      </View>

      <FlatList
        data={looks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        ListEmptyComponent={loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyTitle}>Seus looks aparecerão aqui</Text>
            <Text style={styles.emptyText}>Monte combinações usando as peças do seu guarda-roupa.</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const pieces = (item.look_items || []).map((relation) => relation.clothing_items).filter(Boolean);
          return (
            <TouchableOpacity style={styles.lookCard} onLongPress={() => confirmDelete(item)}>
              <View style={styles.images}>
                {pieces.slice(0, 4).map((piece) => (
                  <View key={piece.id} style={styles.imageBox}>
                    {piece.image_url ? <Image source={{ uri: piece.image_url }} style={styles.image} /> : <Text>👕</Text>}
                  </View>
                ))}
              </View>
              <Text style={styles.lookTitle}>{item.occasion || 'Look'}</Text>
              <Text style={styles.lookMeta}>{[item.style, item.weather].filter(Boolean).join(' • ')}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 27, fontWeight: '700', color: COLORS.text },
  subtitle: { marginTop: 5, color: COLORS.secondaryText },
  list: { padding: 20, paddingTop: 8, paddingBottom: 30 },
  lookCard: { marginBottom: 14, borderRadius: 18, padding: 12, backgroundColor: COLORS.white },
  images: { flexDirection: 'row', gap: 7 },
  imageBox: { flex: 1, height: 145, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.placeholder },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  lookTitle: { marginTop: 10, fontSize: 17, fontWeight: '700', color: COLORS.text },
  lookMeta: { marginTop: 4, fontSize: 12, color: COLORS.secondaryText },
  empty: { marginTop: 25, padding: 25, borderRadius: 20, alignItems: 'center', backgroundColor: COLORS.white },
  emptyIcon: { fontSize: 50 },
  emptyTitle: { marginTop: 15, fontSize: 18, fontWeight: '700', textAlign: 'center', color: COLORS.text },
  emptyText: { marginTop: 8, fontSize: 14, lineHeight: 20, textAlign: 'center', color: COLORS.secondaryText },
  loader: { marginTop: 50 },
});
