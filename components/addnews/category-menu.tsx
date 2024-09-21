import { Text, Select } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

export default function CategoryMenu({ categories }: any) {
    return (
        <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
            >
                <ChevronUp size="$1" />
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={200}>
                <Select.Group>
                    <Select.Label>Kategoriler</Select.Label>
                    {categories.map((category: string, index: number) => (
                        <Select.Item key={category} index={index} value={category}>
                            <Select.ItemText>{category}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                                <Text>✓</Text>
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
            >
                <ChevronDown size="$1" />
            </Select.ScrollDownButton>
        </Select.Content>
    )
}