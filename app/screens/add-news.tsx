import { useState } from "react";
import { useRouter } from "expo-router";
import uuid from 'react-native-uuid';
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
    Image,
} from "tamagui";
import { Alert } from "react-native";
import { ChevronDown } from "@tamagui/lucide-icons";
import CategoryMenu from "@/components/addnews/category-menu";
import { app, db, getFirestore, collection, addDoc } from "../../firebase/index";


const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
    padding: "$4",
});

export default function AddNews() {

    const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Gündem"];
    const router = useRouter();

    const [newsData, setNewsData] = useState({
        id: uuid.v4(),
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        date: new Date(),
    });

    const handleSubmit = async () => {
        try {
            if (newsData.title !== "" && newsData.category !== "" && newsData.description !== "" && newsData.imageUrl !== "") {
                const docref = await addDoc(collection(db, "news"), {
                    title: newsData.title,
                    imageUrl: newsData.imageUrl,
                    description: newsData.description,
                    category: newsData.category,
                    date: new Date(),
                });
                console.log("Document written with", docref);
                Alert.alert("Başarılı", "Haber eklendi, yönlendiriliyorsunuz...");
                console.log(newsData);
                setNewsData({ id: uuid.v4(), title: "", imageUrl: "", description: "", category: "", date: new Date() });
                // router.push("/screens/home");
            } else {
                Alert.alert("Uyarı", "Haber eklemeden önce bilgileri eksiksiz doldurunuz...");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Hata", error as string);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppContainer>
                <Text fontSize="$6" fontWeight="bold" mb="$4">
                    Yeni Haber Ekle
                </Text>
                <Form onSubmit={handleSubmit}>
                    <YStack space="$4">
                        <Input placeholder='Başlık' value={newsData.title} onChangeText={(text) => setNewsData({ ...newsData, title: text })}></Input>
                        <Input
                            placeholder='Görsel URL'
                            value={newsData.imageUrl}
                            onChangeText={(text) => setNewsData({ ...newsData, imageUrl: text })}
                        />
                        {newsData.imageUrl && newsData.imageUrl.startsWith("https://") ? (
                            <Image source={{ uri: newsData.imageUrl, height: 200 }} w="100%" resizeMode="contain" borderRadius="$2" />
                        ) : (
                            newsData.imageUrl && (
                                <Text color="$red10">Lütfen geçerli bir görsel URL'si giriniz (https:// ile başlamalı)</Text>
                            )
                        )}
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
                        <TextArea
                            placeholder='Açıklama'
                            textAlignVertical="top"
                            textAlign="left"
                            multiline={true}
                            value={newsData.description}
                            onChangeText={(text) => setNewsData({ ...newsData, description: text })}
                            numberOfLines={5}
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