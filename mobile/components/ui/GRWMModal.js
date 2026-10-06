import React, { useState } from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {
  colors,
  spacing,
  radius,
  typography,
} from '../../theme';

export default function GRWMModal({
  visible,
  onClose,
  onSave,
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const categories = [
    'Blusas',
    'Calças',
    'Saias',
    'Vestidos',
    'Sapatos',
    'Acessórios',
  ];

  async function handlePickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handleSave() {
    const piece = {
      name,
      category,
      color,
      image,
    };

    if (onSave) {
      onSave(piece);
    }

    setName('');
    setCategory('');
    setColor('');
    setImage(null);

    onClose();
  }

  function handleClose() {
    setName('');
    setCategory('');
    setColor('');
    setImage(null);

    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          {/* CABEÇALHO */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Adicionar peça
            </Text>

            <Pressable
              onPress={handleClose}
              style={styles.closeButton}
            >
              <Ionicons
                name="close"
                size={24}
                color={colors.text}
              />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.form}
          >

            {/* FOTO */}
            <Text style={styles.label}>
              Foto da peça
            </Text>

            <Pressable
              style={styles.photoButton}
              onPress={handlePickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.previewImage}
                />
              ) : (
                <>
                  <Ionicons
                    name="camera-outline"
                    size={32}
                    color={colors.primary}
                  />

                  <Text style={styles.photoText}>
                    Adicionar foto
                  </Text>
                </>
              )}
            </Pressable>

            {/* NOME */}
            <Text style={styles.label}>
              Nome da peça
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Camiseta branca"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
            />

            {/* CATEGORIA */}
            <Text style={styles.label}>
              Categoria
            </Text>

            <View style={styles.categories}>
              {categories.map((item) => {
                const selected = category === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryButton,
                      selected &&
                        styles.categoryButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected &&
                          styles.categoryTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* COR */}
            <Text style={styles.label}>
              Cor
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Branco"
              placeholderTextColor={colors.textLight}
              value={color}
              onChangeText={setColor}
            />

            {/* FAVORITO */}
            <Pressable style={styles.favoriteButton}>
              <Ionicons
                name="heart-outline"
                size={23}
                color={colors.primary}
              />

              <Text style={styles.favoriteText}>
                Adicionar aos favoritos
              </Text>
            </Pressable>

            {/* SALVAR */}
            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Ionicons
                name="checkmark"
                size={21}
                color={colors.white}
              />

              <Text style={styles.saveText}>
                Salvar peça
              </Text>
            </Pressable>

          </ScrollView>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },

  container: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  title: {
    fontSize: typography.subtitle,
    fontWeight: '700',
    color: colors.text,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: typography.small,
    fontWeight: '700',
    color: colors.text,
  },

  photoButton: {
    height: 180,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  photoText: {
    marginTop: spacing.sm,
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.primary,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.white,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.muted,
  },

  categoryButtonSelected: {
    backgroundColor: colors.primary,
  },

  categoryText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.text,
  },

  categoryTextSelected: {
    color: colors.white,
  },

  favoriteButton: {
    height: 50,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteText: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primary,
  },

  saveButton: {
    height: 52,
    marginTop: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    marginLeft: spacing.sm,
    fontSize: typography.button,
    fontWeight: '700',
    color: colors.white,
  },
});
