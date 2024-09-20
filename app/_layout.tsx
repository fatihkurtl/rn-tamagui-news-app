import { useState } from 'react';
import { useFonts } from 'expo-font';
import { config } from "@tamagui/config/v3";
import { createTamagui, TamaguiProvider, Theme, XStack, YStack, Input, ScrollView } from "tamagui";
import { AppBar } from '@/layouts/appbar';
import { Button } from '@/layouts/button';
import { ChangeTheme } from '@/components/theme/ChangeTheme';
import { NewsList } from '@/components/news/news-list';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf { }
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
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={isDarkTheme ? 'dark' : 'light'}>
        <YStack flex={1} bg="$background" f={1} pb="$6" pt="$8">
          <XStack jc="space-between" ai="center" px="$2">
            <AppBar />
            <ChangeTheme onCheckedChange={setIsDarkTheme} />
          </XStack>
          <XStack gap="$2" mt="$4" px="$2">
            <Input flex={1} w="5" h="5" placeholder='Haberlerde ara...'
              focusStyle={{
                bw: 2,
                bc: '$blue10',
              }}
            />
            <Button background='outline' />
          </XStack>
          <ScrollView flex={1} px="$2" mt="$4" w="$full" space="$4">
            <NewsList />
            <NewsList />
            <NewsList />
            <NewsList />
          </ScrollView>
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}

