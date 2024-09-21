import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ScrollView, YStack, XStack, H2, Paragraph, Image, Text, Separator } from "tamagui";

export default function NewsDetail() {
    const [loading, setLoading] = useState(true);
    const params: any = useRoute().params;

    useEffect(() => {
        setLoading(false);
    }, [params.title]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <Text color="$color" fontSize="$4" textAlign="center" p="$4">Yükleniyor...</Text>
            ) : (
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
            )}
        </SafeAreaView>
    )
}