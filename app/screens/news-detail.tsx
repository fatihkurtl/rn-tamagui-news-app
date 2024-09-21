import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, SafeAreaView } from "react-native";
import { ScrollView, YStack, XStack, H1, H2, Paragraph, Image, Text, Separator } from "tamagui";
import { getDocs, collection, db, getDoc, doc, Timestamp } from "@/firebase";
import { NewsItem } from "@/interfaces/news-item";

export default function NewsDetail() {

    const params: any = useRoute().params;

    const [news, setNews] = useState<NewsItem | null>(null);

    const getNewsById = async () => {
        try {
            const docRef = doc(db, "news", params.id);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                setNews({ id: docSnapshot.id, ...docSnapshot.data() } as NewsItem);
            } else {
                Alert.alert("Hata", "Haber bulunamadı");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNewsById();
    }, [params.id]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView bg="$background" flex={1} w="$full" space="$4">
                <YStack space="$4" p="$4">
                    <Text fontSize="$8">{params?.title}</Text>

                    <XStack justifyContent="space-between" alignItems="center">
                        <Text color="$gray10" fontSize="$3">{params.category}</Text>
                        <Text color="$gray10" fontSize="$3">{params.date}</Text>
                    </XStack>

                    <Image
                        source={{
                            uri: params.imageUrl
                        }}
                        alt={params.title}
                        width="100%"
                        height={250}
                        resizeMode="cover"
                    />
                    <Separator />
                    <YStack space="$3">
                        <H2 color="$color" fontSize="$6" fontWeight="bold">Haber Detayı</H2>
                        <Paragraph color="$color">
                            {params.description}
                        </Paragraph>
                    </YStack>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}