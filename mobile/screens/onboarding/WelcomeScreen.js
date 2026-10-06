import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.logoArea}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
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
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 200,
    height:200,
    marginBottom:0,
  },

  tagline: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: COLORS.background,
  },

  bottomArea: {
    width: '90%',
    alignSelf: 'center',
  },
});