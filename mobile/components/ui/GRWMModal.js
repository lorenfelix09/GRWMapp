
import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {
  colors,
  spacing,
  radius,
  typography,
} from '../../theme';

const CATEGORIES = [
  'Blusas',
  'Calças',
  'Saias',
  'Vestidos',
  'Sapatos',
  'Acessórios',
];

export default function GRWMModal({
  visible,
  onClose,
  onSave,
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!visible) {
      setName('');
      setColor('');
      setCategory('');
      setImage(null);
    }
  }, [visible]);

  async function handlePickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para escolher uma imagem.'
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.8,
        });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível abrir a galeria de imagens.'
      );
    }
  }

  function handleSave() {
    if (!name.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Digite o nome da peça.'
      );
      return;
    }

    if (!category) {
      Alert.alert(
        'Campo obrigatório',
        'Selecione uma categoria.'
      );
      return;
    }

    const piece = {
      name: name.trim(),
      category,
      color: color.trim(),
      image,
      favorite: false,
    };

    onSave(piece);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* CABEÇALHO */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Adicionar peça
            </Text>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Fechar modal"
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
            keyboardShouldPersistTaps="handled"
          >
            {/* IMAGEM */}
            <Pressable
              style={styles.imagePicker}
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
                    size={36}
                    color={colors.primary}
                  />

                  <Text style={styles.imagePickerText}>
                    Adicionar foto da peça
                  </Text>
                </>
              )}
            </Pressable>

            {image && (
              <Pressable
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={colors.primary}
                />

                <Text style={styles.removeImageText}>
                  Remover foto
                </Text>
              </Pressable>
            )}

            {/* NOME */}
            <Text style={styles.label}>
              Nome da peça *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: Camiseta branca"
              placeholderTextColor={colors.secondaryText}
              value={name}
              onChangeText={setName}
              maxLength={60}
            />

            {/* COR */}
            <Text style={styles.label}>
              Cor
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: Branco"
              placeholderTextColor={colors.secondaryText}
              value={color}
              onChangeText={setColor}
              maxLength={30}
            />

            {/* CATEGORIA */}
            <Text style={styles.label}>
              Categoria *
            </Text>

            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((item) => {
                const selected = category === item;

                return (
                  <Pressable
                    key={item}
                    style={[
                      styles.categoryButton,
                      selected && styles.selectedCategory,
                    ]}
                    onPress={() => setCategory(item)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* BOTÕES */}
            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>
                Salvar peça
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>
                Cancelar
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    maxHeight: '90%',
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },

  title: {
    ...typography.h2,
    color: colors.text,
  },

  closeButton: {
    padding: spacing.xs,
  },

  imagePicker: {
    height: 180,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },

  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imagePickerText: {
    marginTop: spacing.sm,
    color: colors.primary,
    fontSize: 14,
  },

  removeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },

  removeImageText: {
    color: colors.primary,
    fontSize: 13,
  },

  label: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
    fontSize: 15,
  },

  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },

  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.text,
    fontSize: 13,
  },

  selectedCategoryText: {
    color: colors.onPrimary || '#FFFFFF',
    fontWeight: '600',
  },

  saveButton: {
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },

  saveButtonText: {
    color: colors.onPrimary || '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },

  cancelButtonText: {
    color: colors.text,
    fontSize: 15,
  },
});
