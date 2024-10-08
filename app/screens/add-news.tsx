import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { ScrollView, YStack, XStack, Form, Input, Button, Text, TextArea, Select, styled, Adapt, Sheet, AdaptContents, Image } from "tamagui";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { db, collection, addDoc } from "../../firebase/index";
import CategoryMenu from "@/components/addnews/category-menu";

const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
    padding: "$4",
});

export default function AddNews() {
    const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Gündem"];
    const [alert, setAlert] = useState(false);
    const router = useRouter();

    const [newsData, setNewsData] = useState({
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = async () => {
        try {
            if (newsData.title !== "" && newsData.category !== "" && newsData.description !== "" && newsData.imageUrl !== "") {
                const docref = await addDoc(collection(db, "news"), {
                    title: newsData.title,
                    imageUrl: newsData.imageUrl,
                    description: newsData.description,
                    category: newsData.category,
                    date: new Date(newsData.date),
                });
                console.log(newsData);
                setAlert(true);
                setNewsData({ title: "", imageUrl: "", description: "", category: "", date: new Date().toISOString().split('T')[0] });
                setTimeout(() => {
                    router.push("/screens/home");
                }, 2000);
            } else {
                Alert.alert("Uyarı", "Haber eklemeden önce bilgileri eksiksiz doldurunuz...");
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
                {alert && (
                    <XStack alignItems="center">
                        <Text color="$green10" fontSize="$5">
                            Yeni haber başarıyla eklendi.
                        </Text>
                        <Check color="$green10" />
                    </XStack>
                )}
                <Form onSubmit={handleSubmit}>
                    <YStack space="$4">
                        <Input placeholder='Başlık' value={newsData.title} onChangeText={(text) => setNewsData({ ...newsData, title: text })}
                            focusStyle={{
                                bw: 2,
                                bc: '$blue10',
                            }} />
                        <Input
                            placeholder='Görsel URL'
                            value={newsData.imageUrl}
                            onChangeText={(text) => setNewsData({ ...newsData, imageUrl: text })}
                            focusStyle={{
                                bw: 2,
                                bc: '$blue10',
                            }}
                        />
                        {newsData.imageUrl && newsData.imageUrl.startsWith("https://") ? (
                            <Image source={{ uri: newsData.imageUrl, height: 200 }} w="100%" resizeMode="contain" borderRadius="$2" />
                        ) : (
                            newsData.imageUrl && (
                                <Text color="$red10">Lütfen geçerli bir görsel URL'si giriniz (https:// ile başlamalı)</Text>
                            )
                        )}
                        <Select value={newsData.category} onValueChange={(text) => setNewsData({ ...newsData, category: text })} >
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
                        <XStack alignItems="center" w="100%">
                            {/* <Text marginRight="$2">Tarih:</Text> */}
                            <Input
                                w="100%"
                                placeholder='Tarih (YYYY-MM-DD)'
                                value={newsData.date}
                                onChangeText={(text) => {
                                    const parsedDate = new Date(text);
                                    if (!isNaN(parsedDate.getTime())) {
                                        setNewsData({ ...newsData, date: text });
                                    } else {
                                        Alert.alert("Hata", "Geçerli bir tarih formatı giriniz (YYYY-MM-DD)");
                                    }
                                }}
                                focusStyle={{
                                    bw: 2,
                                    bc: '$blue10',
                                }}
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
                            focusStyle={{
                                bw: 2,
                                bc: '$blue10',
                            }}
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
