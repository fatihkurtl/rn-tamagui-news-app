import { Text, Select } from "tamagui";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

export default function CategoryMenu({ categories }: any) {
    return (
        <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
                ai="center"
                jc="center"
                p="releative"
                w="100%"
                h="$3"
            >
                <ChevronUp size="$1" />

                <Select.Viewport minWidth={200}>
                    <Select.Group>
                        <Select.Label>Kategoriler</Select.Label>
                        {categories.map((category: any, index: any) => (
                            <Select.Item key={category} index={index} value={category}>
                                <Select.ItemText>{category}</Select.ItemText>
                                <Select.ItemIndicator ml="auto">
                                    <Check />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    jc="center"
                    p="relative"
                    w="100%"
                    h="$3"
                >
                    <ChevronDown size="$1" />

                </Select.ScrollDownButton>

            </Select.ScrollUpButton>
        </Select.Content>
    )
}