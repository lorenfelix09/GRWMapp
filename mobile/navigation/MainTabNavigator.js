import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


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
      screenOptions={({ route }) => ({
        headerShown: false,


        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,


        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,


          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 8,
        },


        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },


        tabBarIcon: ({ color, focused }) => {
          let iconName;


          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;


            case 'Wardrobe':
              iconName = focused ? 'shirt' : 'shirt-outline';
              break;


            case 'Looks':
              iconName = focused ? 'sparkles' : 'sparkles-outline';
              break;


            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;


            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;


            default:
              iconName = 'ellipse-outline';
          }


          return (
            <Ionicons
              name={iconName}
              size={23}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
        }}
      />


      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          title: 'Closet',
        }}
      />


      <Tab.Screen
        name="Looks"
        component={LooksScreen}
        options={{
          title: 'Looks',
        }}
      />


      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: 'Favoritos',
        }}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
