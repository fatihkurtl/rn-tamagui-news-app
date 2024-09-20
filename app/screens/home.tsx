import { useState } from 'react';
import { XStack, YStack, Input, ScrollView } from "tamagui";
import { Button } from '@/layouts/button';
import { NewsList } from '@/components/news/news-list';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
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