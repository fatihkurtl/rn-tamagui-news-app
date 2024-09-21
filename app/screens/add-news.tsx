import { useState } from "react";
import { useRouter } from "expo-router";
import {
    ScrollView,
    YStack,
    XStack,
    Form,
    Input,
    Button,
    Text,
    TextArea,
    Select,
    styled,
    Adapt,
    Sheet,
    AdaptContents,
} from "tamagui";
import { Alert } from "react-native";
import { ChevronDown } from "@tamagui/lucide-icons";
import CategoryMenu from "@/components/addnews/category-menu";


const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
    padding: "$4",
});

export default function AddNews() {

    const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Gündem"];
    const router = useRouter();

    const [newsData, setNewsData] = useState({
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        date: new Date(),
    });

    const handleSubmit = () => {
        try {
            console.log(newsData);
        } catch (error) {
            Alert.alert("Hata", error as string);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppContainer>
                <Text fontSize="$6" fontWeight="bold" mb="$4">
                    Haber Ekle
                </Text>
                <Form onSubmit={handleSubmit}>
                    <YStack space="$4">
                        <Input placeholder='Başlık' value={newsData.title} onChangeText={(text) => setNewsData({ ...newsData, title: text })}></Input>
                        <TextArea
                            placeholder='Açıklama'
                            value={newsData.description}
                            onChangeText={(text) => setNewsData({ ...newsData, description: text })}
                            numberOfLines={4}
                        />
                        <Select value={newsData.category} onValueChange={(text) => setNewsData({ ...newsData, category: text })}>
                            <Select.Trigger w="100%" iconAfter={ChevronDown}>
                                <Select.Value placeholder='Kategori Seçin' />
                            </Select.Trigger>

                            <Adapt>
                                <Sheet modal dismissOnSnapToBottom>
                                    <Sheet.Frame>
                                        <Sheet.ScrollView>
                                            <AdaptContents />
                                        </Sheet.ScrollView>
                                    </Sheet.Frame>
                                </Sheet>
                            </Adapt>

                            <CategoryMenu categories={categories} />

                        </Select>
                        <XStack alignItems="center">
                            <Text marginRight="$2">Tarih:</Text>
                            <Input
                                placeholder='Tarih (YYYY-MM-DD)'
                                value={newsData.date.toISOString().split('T')[0]}
                                onChange={(e) => setNewsData({ ...newsData, date: new Date(e.nativeEvent.text) })}
                            />
                        </XStack>
                        <Input
                            placeholder='Görsel URL'
                            value={newsData.imageUrl}
                            onChangeText={(text) => setNewsData({ ...newsData, imageUrl: text })}
                        />
                        <Button onPress={handleSubmit} themeInverse>
                            Haber Ekle
                        </Button>
                    </YStack>
                </Form>
            </AppContainer>
        </ScrollView>
    )
}