import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { CardProps } from "tamagui";
import { Button, Card, Image, Text, XStack, YStack } from "tamagui";
import { Timestamp } from "@/firebase";
import type { NewsItem } from "@/interfaces/news-item";

export function NewsList({
    title,
    category,
    imageUrl,
    description,
    date,
}: NewsItem, props: CardProps) {
    const formattedDate = (date: string | Timestamp) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date instanceof Timestamp ? new Date(date.toDate()).toLocaleDateString('tr-TR', options as any) : new Date(date).toLocaleDateString('tr-TR', options as any);
    };

    type RootStackParamList = {
        'screens/news-detail': {
            title: string;
            category: string;
            imageUrl: string;
            description: string;
            date: string;
        };
        // Diğer ekranlarınızı buraya ekleyin
    };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <YStack space="$2">
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
                        source={{ uri: imageUrl }}
                        borderRadius="$2"
                    />
                </Card.Header>
                <YStack p="$3" space="$2">
                    <XStack jc="space-between" ai="center">
                        <Text color="$blue10" fontWeight="bold">{category}</Text>
                        <Text color="$color" fontSize="$1">{formattedDate(date)}</Text>
                    </XStack>
                    <Text fontWeight="bold" mt="$1" fontSize="$5" color="$color">{title}</Text>
                    <Text fontWeight="medium" theme="alt2" fontSize="$3">{description.trim().substring(0, 100) + "..."}</Text>
                    <Button
                        onPress={() => {
                            navigation.navigate('NewsDetail', {
                                title: title,
                                category: category,
                                imageUrl: imageUrl,
                                description: description,
                                date: formattedDate(date),
                            });
                        }} mt="$3" theme="alt2" size="$2" alignSelf="flex-end" bg="$gray6">
                        <Text color="$color">Daha Fazla Oku</Text>
                    </Button>
                </YStack>
            </Card>
        </YStack>
    );
}
