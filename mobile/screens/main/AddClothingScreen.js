import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';
import { CLOTHING_CATEGORIES, STYLE_OPTIONS, WEATHER_OPTIONS } from '../../constants/categories';
import { criarPecaComImagem } from '../../services/clothingService';

export default function AddClothingScreen({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CLOTHING_CATEGORIES[0]);
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [temperature, setTemperature] = useState('');
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.85,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à câmera para tirar uma foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.85,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function save() {
    if (!name.trim()) {
      Alert.alert('Falta o nome', 'Digite um nome para a peça.');
      return;
    }

    try {
      setSaving(true);

      await criarPecaComImagem(
        {
          name: name.trim(),
          category,
          color: color.trim(),
          style: style || null,
          temperature: temperature || null,
        },
        image?.uri,
        image?.mimeType || 'image/jpeg'
      );

      Alert.alert('Peça salva!', 'A roupa foi adicionada ao seu guarda-roupa.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar a peça.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Adicionar peça</Text>
        <Text style={styles.subtitle}>Cadastre uma roupa do seu guarda-roupa.</Text>

        <View style={styles.imageArea}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          ) : (
            <Text style={styles.imagePlaceholder}>📷</Text>
          )}
        </View>

        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={chooseImage}>
            <Text style={styles.secondaryButtonText}>Escolher foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
            <Text style={styles.secondaryButtonText}>Tirar foto</Text>
          </TouchableOpacity>
        </View>

        <Field label="Nome" value={name} onChangeText={setName} placeholder="Ex.: Camiseta branca" />
        <Field label="Cor" value={color} onChangeText={setColor} placeholder="Ex.: Branco" />

        <Text style={styles.label}>Categoria</Text>
        <Options options={CLOTHING_CATEGORIES} selected={category} onSelect={setCategory} />

        <Text style={styles.label}>Estilo</Text>
        <Options options={STYLE_OPTIONS} selected={style} onSelect={setStyle} allowEmpty />

        <Text style={styles.label}>Clima</Text>
        <Options options={WEATHER_OPTIONS} selected={temperature} onSelect={setTemperature} allowEmpty />

        <View style={styles.saveArea}>
          {saving ? <ActivityIndicator color={COLORS.primary} /> : <PrimaryButton title="Salvar peça" onPress={save} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, ...props }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} placeholderTextColor={COLORS.muted} />
    </View>
  );
}

function Options({ options, selected, onSelect, allowEmpty = false }) {
  return (
    <View style={styles.options}>
      {allowEmpty && (
        <TouchableOpacity
          style={[styles.option, !selected && styles.selectedOption]}
          onPress={() => onSelect('')}
        >
          <Text style={[styles.optionText, !selected && styles.selectedOptionText]}>Sem preferência</Text>
        </TouchableOpacity>
      )}
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.option, selected === option && styles.selectedOption]}
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.optionText, selected === option && styles.selectedOptionText]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 27, fontWeight: '700', color: COLORS.text },
  subtitle: { marginTop: 5, marginBottom: 20, color: COLORS.secondaryText },
  imageArea: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  preview: { width: '100%', height: '100%', resizeMode: 'cover' },
  imagePlaceholder: { fontSize: 52 },
  imageButtons: { flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 10 },
  secondaryButton: {
    flex: 1,
    minHeight: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  secondaryButtonText: { color: COLORS.primary, fontWeight: '700' },
  label: { marginTop: 15, marginBottom: 7, fontWeight: '700', color: COLORS.text },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedOption: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { fontSize: 12, color: COLORS.text },
  selectedOptionText: { color: COLORS.white, fontWeight: '700' },
  saveArea: { marginTop: 25 },
});
