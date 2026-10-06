import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Título */}
        <Text style={styles.title}>
          Meu perfil
        </Text>

        {/* Card do perfil */}
        <View style={styles.profile}>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={38}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.name}>
            Loren
          </Text>

          <Text style={styles.username}>
            @usuario
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.editButtonText}>
              Editar perfil
            </Text>
          </TouchableOpacity>

        </View>

        {/* Menu */}
        <View style={styles.menu}>

          <MenuItem
            icon="shirt-outline"
            title="Meu closet"
          />

          <MenuItem
            icon="heart-outline"
            title="Favoritos"
          />

          <MenuItem
            icon="sparkles-outline"
            title="Meus looks"
          />

          <MenuItem
            icon="settings-outline"
            title="Configurações"
          />

          <MenuItem
            icon="help-circle-outline"
            title="Ajuda"
            last
          />

        </View>

      </View>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title, last }) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        last && styles.lastMenuItem,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>

        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={21}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.menuText}>
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={COLORS.secondaryText}
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: COLORS.text,
  },

  profile: {
    marginTop: 24,
    padding: 25,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  name: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.text,
  },

  username: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  editButton: {
    marginTop: 18,
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },

  menu: {
    marginTop: 18,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },

  menuItem: {
    minHeight: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: COLORS.background,
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});
