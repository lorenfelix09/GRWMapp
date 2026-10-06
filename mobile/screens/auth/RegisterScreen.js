import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    // Cadastro no Supabase será conectado depois.
    alert('Cadastro realizado com sucesso!');

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >

          {/* Voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.text}
            />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Criar conta
            </Text>

            <Text style={styles.subtitle}>
              Crie sua conta e comece a organizar seu closet.
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>

            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Nome
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.secondaryText}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor={COLORS.secondaryText}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* E-mail */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                E-mail
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.secondaryText}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={COLORS.secondaryText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Senha
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.secondaryText}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor={COLORS.secondaryText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color={COLORS.secondaryText}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirmar senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Confirmar senha
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.secondaryText}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor={COLORS.secondaryText}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <Ionicons
                    name={
                      showConfirmPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color={COLORS.secondaryText}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>
                Criar conta
              </Text>
            </TouchableOpacity>

          </View>

          {/* Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Já possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    padding: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  header: {
    marginTop: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.secondaryText,
  },

  form: {
    marginTop: 30,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  inputContainer: {
    height: 54,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
  },

  registerButton: {
    height: 56,
    marginTop: 8,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },

  registerButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
  },

  loginContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  loginText: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
