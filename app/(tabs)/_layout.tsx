import { useFonts } from 'expo-font';
import { TamaguiProvider, YStack } from 'tamagui';
import config from '../../tamagui.config';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    // add this
    <TamaguiProvider config={config}>
      <YStack>
      
      </YStack>
    </TamaguiProvider>
  )
}

