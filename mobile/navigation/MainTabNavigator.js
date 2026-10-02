import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/main/HomeScreen';
import WardrobeScreen from '../screens/main/WardrobeScreen';
import LooksScreen from '../screens/main/LooksScreen';
import FavoriteScreen from '../screens/main/FavoriteScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,

        tabBarInactiveTintColor: COLORS.muted,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 7,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarIcon: () => <Text>⌂</Text>,
        }}
      />

      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          title: 'Guarda-roupa',
          tabBarIcon: () => <Text>👕</Text>,
        }}
      />

      <Tab.Screen
        name="Looks"
        component={LooksScreen}
        options={{
          title: 'Looks',
          tabBarIcon: () => <Text>✨</Text>,
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: () => <Text>♡</Text>,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: () => <Text>◯</Text>,
        }}
      />

    </Tab.Navigator>
  );
}
