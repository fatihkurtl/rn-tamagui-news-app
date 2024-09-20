import { XStack, Switch, SwitchProps } from "tamagui";
import { Sun, Moon } from '@tamagui/lucide-icons';

export function ChangeTheme({ ...rest }: SwitchProps) {
    return (
        <XStack gap="$2" ai="center">
            <Sun size="$1" />
            <Switch size="$2" bg="$gray6" {...rest}>
                <Switch.Thumb animation="bouncy" />
            </Switch>
            <Moon size="$1" />
        </XStack>
    )
}