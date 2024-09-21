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
} from "tamagui";
import { Alert } from "react-native";

const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Gündem"];

const AppContainer = styled(YStack, {
    flex: 1,
    backgroundColor: "$background",
    padding: "$4",
});

export default function AddNewsScreen() {

    const router = useRouter();

    const [newsData, setNewsData] = useState({
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        date: "",
    });

    const handleSubmit = () => {
        try {
            
        } catch (error) {
            Alert.alert("Hata", error as string);
        }
    }

    return (
        <ScrollView>
            <XStack>
                <Text>
                    Add News Screen
                </Text>
            </XStack>
        </ScrollView>
    )
}