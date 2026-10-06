import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View> 

          <Text style={styles.title}>
            Bem-vindo de volta
          </Text>

          <Text style={styles.subtitle}>
            Entre para continuar.
          </Text>
        </View>

        <View style={styles.form}>

          <TextInput
            placeholder="E-mail"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgot}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

      <View style={styles.buttonsContainer}>
          <PrimaryButton
            title="Entrar"
            onPress={() => navigation.replace('Main')}
          />

          <Text style={styles.or}>ou</Text>

          <PrimaryButton
            title="Criar conta"
            variant="outlineDark"
            onPress={() => navigation.navigate('Register')}
          />

      </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },

  logoImage: {
    width: 270,
    height: 150,
    marginBottom: 0,
  },

  buttonsContainer: {
    width: '95%',
    alignSelf: 'center',
  },

  title: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.white,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.background,
  },

  form: {
    gap: 15,
  },

  input: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#68504A',
    color: COLORS.white,
    backgroundColor: '#24110D',
    width: '90%',
    alignSelf: 'center',
  },

  forgot: {
    textAlign: 'right',
    width: '95%',
    fontSize: 13,
    color: COLORS.background,
  },

  or: {
    textAlign: 'center',
    color: COLORS.background,
    marginVertical: 14,
    fontSize: 18,
  },

  buttons: {
    width: '90%',
    alignSelf: 'center',
    gap: 10,
  },
});