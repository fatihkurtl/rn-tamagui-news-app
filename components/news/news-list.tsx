import { router } from "expo-router";
import type { CardProps } from "tamagui";
import { Button, Card, Image, Paragraph, Text, XStack, YStack } from "tamagui";

export function NewsList(props: CardProps) {
    return (
        <Card
            size="$4"
            bordered
            {...props}
            width="100%"
            height="auto"
            borderColor="$borderColor"
            backgroundColor="$background"
            shadowColor="$shadowColor"
            shadowRadius={5}
            shadowOffset={{ width: 0, height: 2 }}
            elevate={false}
        >
            <Card.Header padded>
                <Image
                    width="100%"
                    height={200}
                    source={{ uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' }}
                    borderRadius="$2"
                />
            </Card.Header>
            <YStack p="$3" space="$2">
                <XStack jc="space-between" ai="center">
                    <Text color="$blue10" fontWeight="bold">Teknoloji</Text>
                    <Text color="$gray10" fontSize="$1">20 Eylül 2024</Text>
                </XStack>
                <Text fontWeight="bold" mt="$1" fontSize="$5">Haber Başlığı</Text>
                <Text fontWeight="medium" theme="alt2" fontSize="$3">Haberin Kısa Özeti</Text>
                <Paragraph theme="alt2" mt="$2">
                    Bu bir haber kartı için örnek metindir. Bu alanda haberin kısa bir özeti yer alır. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Paragraph>
                <Button onPress={() => router.push('/screens/news-detail')} mt="$3" theme="alt2" size="$2" alignSelf="flex-end" bg="$gray6">
                    <Text>Daha Fazla Oku</Text>
                </Button>
            </YStack>
        </Card>
    );
}
