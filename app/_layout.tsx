import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';
import { config } from "@tamagui/config/v3";
import { Stack as NativeStack } from "expo-router";
import { createTamagui, TamaguiProvider, Theme, XStack, YStack } from "tamagui";
import { AppBar } from '@/layouts/appbar';
import { ChangeTheme } from '@/components/theme/ChangeTheme';

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
          <YStack flex={1} bg="$background" f={1} pb="$6" pt="$8">
            <XStack jc="space-between" ai="center" px="$2">
              <AppBar />
              <ChangeTheme onCheckedChange={setIsDarkTheme} />
            </XStack>
            <NativeStack>
              <NativeStack.Screen name="index" options={{ headerShown: false }} />
              <NativeStack.Screen
                name="screens/home"
                options={{ title: "Haberler", headerShown: false }}
              />
              <NativeStack.Screen
                name="screens/news-detail"
                options={{ title: "Haber Detayı", headerShown: false }}
              />
              <NativeStack.Screen
                name="screens/add-news"
                options={{ title: "Haber Ekle", headerShown: false }}
              />
            </NativeStack>
          </YStack>
        </Theme>
      </TamaguiProvider>
    </SafeAreaView>
  )
}