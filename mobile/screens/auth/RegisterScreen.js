import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.subtitle}>
        Tela de cadastro do GRWM
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8E5D7',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#530F0E',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#30150E',
  },
});