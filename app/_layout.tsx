import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';
import { config } from "@tamagui/config/v3";
import { createTamagui, TamaguiProvider, Theme, XStack, YStack } from "tamagui";
import { AppBar } from '@/layouts/appbar';
import { ChangeTheme } from '@/components/theme/ChangeTheme';
import Home from './screens/home'; // Home bileşenini içe aktar
import NewsDetail from './screens/news-detail'; // NewsDetail bileşenini içe aktar
import AddNews from './screens/add-news'; // AddNews bileşenini içe aktar

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf { }
}

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator>
              <Stack.Screen
                name="index"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="screens/home"
                component={Home}
                options={{ title: "Haberler", headerShown: false }}
              />
              <Stack.Screen
                name="screens/news-detail"
                component={NewsDetail}
                options={{ title: "Haber Detayı", headerShown: false }}
              />
              <Stack.Screen
                name="screens/add-news"
                component={AddNews}
                options={{ title: "Haber Ekle", headerShown: false }}
              />
            </Stack.Navigator>
          </YStack>
        </Theme>
      </TamaguiProvider>
    </SafeAreaView>
  )
}