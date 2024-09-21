import { useState } from 'react';
import { useRouter } from "expo-router";
import { XStack, YStack, Input, ScrollView, styled, Select, Adapt, AdaptContents, Sheet } from "tamagui";
import { SafeAreaView } from 'react-native';
import { Calendar, Check, ChevronDown, ChevronsDown, PlusCircle } from '@tamagui/lucide-icons';
import { NewsList } from '@/components/news/news-list';
import { Button } from '@/layouts/button';


const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
})


export default function HomeScreen() {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [selectedDateFilter, setSelectedDateFilter] = useState("Tümü");

    const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Kültür"];
    const dateFilters = ["Tümü", "Son 7 gün", "Bu Ay", "Bu Yıl"];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <YStack flex={1} bg="$background" f={1} pb="$0" pt="$3">
                <XStack gap="$2" mt="$0" px="$2">
                    <Input flex={1} w="5" h="5" placeholder='Haberlerde ara...'
                        focusStyle={{
                            bw: 2,
                            bc: '$blue10',
                        }}
                    />
                    <Button background='outline' />
                </XStack>
                {/* <AppContainer> */}
                <XStack justifyContent='space-between' alignItems='center' padding="$2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <Select.Trigger width={150} iconAfter={ChevronDown}>
                            <Select.Value placeholder='Kategori' />
                        </Select.Trigger>

                        <Adapt when="sm" platform="touch">
                            <Sheet modal dismissOnSnapToBottom>
                                <Sheet.Frame>
                                    <Sheet.ScrollView>
                                        <Adapt.Contents />
                                    </Sheet.ScrollView>
                                </Sheet.Frame>
                            </Sheet>
                        </Adapt>

                        <Select.Content>
                            <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                                <ChevronsDown size={20} />
                            </Select.ScrollUpButton>

                            <Select.Viewport minWidth={200}>
                                <Select.Group>
                                    {categories.map((category, index) => (
                                        <Select.Item key={category} index={index} value={category}>
                                            <Select.ItemText>{category}</Select.ItemText>
                                            <Select.ItemIndicator ml="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Viewport>
                            <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                                <ChevronsDown size={20} />
                            </Select.ScrollDownButton>
                        </Select.Content>
                    </Select>
                    <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                        <Select.Trigger width={150} iconAfter={Calendar}>
                            <Select.Value placeholder='Tarih' />
                        </Select.Trigger>

                        <Adapt when="sm" platform="touch">
                            <Sheet modal dismissOnSnapToBottom>
                                <Sheet.Frame>
                                    <Sheet.ScrollView>
                                        <Adapt.Contents />
                                    </Sheet.ScrollView>
                                </Sheet.Frame>
                                <Sheet.Overlay />
                            </Sheet>
                        </Adapt>

                        <Select.Content>
                            <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                                <ChevronsDown size={20} />
                            </Select.ScrollUpButton>

                            <Select.Viewport minWidth={200}>
                                <Select.Group>
                                    {dateFilters.map((dateFilter, index) => (
                                        <Select.Item key={dateFilter} index={index} value={dateFilter}>
                                            <Select.ItemText>{dateFilter}</Select.ItemText>
                                            <Select.ItemIndicator ml="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Viewport>
                            <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                                <ChevronsDown size={20} />
                            </Select.ScrollDownButton>
                        </Select.Content>
                    </Select>
                    <Button
                        onPress={() => router.push("/screens/add-news" as any)}
                        themeInverse
                        iconAfter={PlusCircle}
                        width={50}
                    >
                    </Button>
                </XStack>
                {/* </AppContainer> */}
                <ScrollView flex={1} px="$2" mt="$4" w="$full" space="$4">
                    <NewsList />
                    <NewsList />
                    <NewsList />
                    <NewsList />
                </ScrollView>
            </YStack>
        </SafeAreaView>
    )
}