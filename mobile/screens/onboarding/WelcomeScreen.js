import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.logoArea}>
          <Text style={styles.logo}>GRWM</Text>

          <Text style={styles.tagline}>
            seu guarda-roupa,
            {'\n'}
            com mais possibilidades.
          </Text>
        </View>

        <View style={styles.bottomArea}>
          <PrimaryButton
            title="Começar"
            onPress={() => navigation.navigate('Onboarding')}
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

  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    fontSize: 46,
    fontWeight: '300',
    letterSpacing: 4,
    color: COLORS.white,
  },

  tagline: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: COLORS.background,
  },

  bottomArea: {
    paddingBottom: 10,
  },
});