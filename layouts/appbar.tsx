import { Text, XStack, Avatar, YStack, H4 } from 'tamagui';

export function AppBar() {
    return (
        <XStack gap="$1">
            {/* <Avatar size="$5" circular>
                <Avatar.Image src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                <Avatar.Fallback backgroundColor="$gray5" />
            </Avatar> */}
            <YStack>
                {/* <Text color="$gray10">
                    Merhaba,
                </Text> */}
                <H4 fontWeight="bold" mt="$0">
                    News App
                </H4>
            </YStack>
        </XStack>
    )
}