import { Text, XStack, Avatar, YStack, H4 } from 'tamagui';

export function AppBar() {
    return (
        <XStack gap="$1">
            <YStack>
                <H4 fontWeight="bold" mt="$0">
                    News App
                </H4>
            </YStack>
        </XStack>
    )
}