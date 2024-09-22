import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { XStack, YStack, Input, ScrollView, styled, Select, Adapt, Sheet, Text } from "tamagui";
import { SafeAreaView } from 'react-native';
import { Calendar, Check, ChevronDown, ChevronsDown, PlusCircle } from '@tamagui/lucide-icons';
import { NewsList } from '@/components/news/news-list';
import { Button } from '@/layouts/button';
import { getDocs, collection, db, Timestamp } from "@/firebase";
import type { NewsItem } from "@/interfaces/news-item";


const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
})

export default function Home() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Gündem"];
    const dateFilters = ["Tümü", "Son 7 gün", "Bu Ay", "Bu Yıl"];
    const [news, setNews] = useState<NewsItem[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [selectedDateFilter, setSelectedDateFilter] = useState("Tümü");
    const [loading, setLoading] = useState(true);

    const getNews = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "news"));
            const fetchedNews: NewsItem[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedNews.push({
                    id: doc.id,
                    ...data,
                    date: data.date instanceof Timestamp ? data.date : data.date,
                } as NewsItem);
                console.log(data);
            });
            fetchedNews.sort((a: any, b: any) => b.date - a.date);
            setNews(fetchedNews);
            setFilteredNews(fetchedNews);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    useEffect(() => {
        filterNews(selectedCategory, selectedDateFilter, searchValue);
    }, [selectedCategory, selectedDateFilter]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        filterNews(category, selectedDateFilter, searchValue);
    }

    const handleDateFilterChange = (dateFilter: string) => {
        setSelectedDateFilter(dateFilter);
        filterNews(selectedCategory, dateFilter, searchValue);
    }

    const handleSearch = (text: string) => {
        setSearchValue(text);
        filterNews(selectedCategory, selectedDateFilter, text);
    };

    const filterNews = (category: string, dateFilter: string, searchTerm: string) => {
        let filtered = news;

        if (category !== "Tümü") {
            filtered = filtered.filter((item) => item.category === category);
        }

        if (dateFilter === "Son 7 gün") {
            filtered = filtered.filter((item) => item.date >= Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)));
        } else if (dateFilter === "Bu Ay") {
            filtered = filtered.filter((item) => item.date >= Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)));
        } else if (dateFilter === "Bu Yıl") {
            filtered = filtered.filter((item) => item.date >= Timestamp.fromDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)));
        }

        if (searchTerm) {
            filtered = filtered.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredNews(filtered);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <YStack flex={1} bg="$background" f={1} pb="$0" pt="$3">
                <XStack gap="$2" mt="$0" px="$2" alignItems='center'>
                    <Input value={searchValue} onChangeText={handleSearch} flex={1} w="$5" h="$3" placeholder='Haberlerde ara...'
                        focusStyle={{
                            bw: 2,
                            bc: '$blue10',
                        }}
                    />
                </XStack>
                <XStack justifyContent='space-between' alignItems='center' padding="$2">
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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
                    <Select value={selectedDateFilter} onValueChange={handleDateFilterChange}>
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
                        icon={PlusCircle}
                        width={50}
                        h="$4"
                    >
                    </Button>
                </XStack>
                <ScrollView flex={1} px="$2" mt="$4" w="$full" space="$4">
                    <YStack space="$4">
                        {loading ? (
                            <Text color="$color" fontSize="$4" textAlign="center">
                                Yükleniyor...
                            </Text>
                        ) : filteredNews.length < 1 ? (
                            <Text color="$color" fontSize="$4" textAlign="center">
                                Hiç Haber Bulunamadı !
                            </Text>
                        ) : (
                            filteredNews.map((news, index) => (
                                <NewsList key={news.id} {...news} />
                            ))
                        )}
                    </YStack>
                </ScrollView>
            </YStack>
        </SafeAreaView>
    )
}