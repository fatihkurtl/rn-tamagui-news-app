import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { config } from '@tamagui/config/v3';
import { createTamagui, TamaguiProvider, Theme, XStack, YStack } from 'tamagui';
import { AppBar } from '@/layouts/appbar';
import { ChangeTheme } from '@/components/theme/ChangeTheme';
import Home from './screens/home';
import NewsDetail from './screens/news-detail';
import AddNews from './screens/add-news';
import { BadgePlus, Home as HomeIcon } from '@tamagui/lucide-icons';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Haberler', headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'Haber Detayı', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AddNewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddNews"
        component={AddNews}
        options={{ title: 'Haber Ekle', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={isDarkTheme ? 'dark' : 'light'}>
          <YStack flex={1} bg="$background" f={1} pb="$1" pt="$8">
            <XStack jc="space-between" ai="center" px="$2">
              <AppBar />
              <ChangeTheme onCheckedChange={setIsDarkTheme} />
            </XStack>

            <Tab.Navigator screenOptions={{
              tabBarStyle: {
                backgroundColor: isDarkTheme ? '#000' : '#fff',
                borderTopColor: isDarkTheme ? '#444' : '#ccc',
              },
              tabBarActiveTintColor: isDarkTheme ? '#fff' : '#000',
              tabBarInactiveTintColor: isDarkTheme ? '#888' : '#666',
            }}>
              <Tab.Screen
                name="screens/home"
                component={HomeStack}
                options={{
                  title: 'Haberler', headerShown: false, tabBarIcon(props) {
                    return (
                      <HomeIcon size={props.size} color={props.color} />
                    )
                  },
                }}
              />
              <Tab.Screen
                name="screens/add-news"
                component={AddNewsStack}
                options={{
                  title: 'Haber Ekle', headerShown: false, tabBarIcon(props) {
                    return (
                      <BadgePlus size={props.size} color={props.color} />
                    )
                  },
                }}
              />
            </Tab.Navigator>
          </YStack>
        </Theme>
      </TamaguiProvider>
    </SafeAreaView>
  );
}
