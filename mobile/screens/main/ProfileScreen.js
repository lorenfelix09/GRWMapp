import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Meu perfil
        </Text>

        <View style={styles.profile}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              👤
            </Text>
          </View>

          <Text style={styles.name}>
            Loren
          </Text>

          <Text style={styles.username}>
            @usuario
          </Text>

        </View>

        <View style={styles.menu}>
          <MenuItem title="Minhas viagens" />
          <MenuItem title="Minhas metas" />
          <MenuItem title="Configurações" />
          <MenuItem title="Ajuda" />
        </View>

      </View>
    </SafeAreaView>
  );
}

function MenuItem({ title }) {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>
        {title}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: COLORS.text,
  },

  profile: {
    marginTop: 25,
    padding: 25,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  avatarText: {
    fontSize: 35,
  },

  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  username: {
    marginTop: 4,
    color: COLORS.secondaryText,
  },

  menu: {
    marginTop: 18,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },

  menuItem: {
    minHeight: 55,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  menuText: {
    color: COLORS.text,
  },

  arrow: {
    fontSize: 22,
    color: COLORS.secondaryText,
  },
});
