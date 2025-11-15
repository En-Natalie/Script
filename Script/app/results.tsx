import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedButton } from '@/components/ui/themed-button';
import {Fragment, useEffect, useState} from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router'
import ImageBoxView from "@/components/ui/image-box-view";
import {acceptedImages, ImageCBuilder, resetAcceptedImages} from './confirm'

export type ImageBuilder = {
    url: string;
    id: number;
    width: number;
    height: number;
}

export default function ResultsScreen() {
    const router = useRouter();

    const [images, setImages] = useState<ImageCBuilder[]>([
        {
            url: "asdfasdf",
            id: 100,
            width: 20,
            height: 20,
            description: "bad image lmao"
        }
    ]);

    useEffect(() => {
        setImages(acceptedImages);
    }, [setImages]);

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxView
                id={ib.id}
                url={ib.url}
                width={ib.width}
                height={ib.height}
                description={ib.description}>
            </ImageBoxView>
        </Fragment>
    );

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Results' backPath='/home'></Header>
            <ThemedView color='background'>
                {imageBoxes}
            </ThemedView>

            <ThemedView color='accent' style={styles.buttonMenu}>

                <ThemedButton onPress={() => { resetAcceptedImages(); router.dismissTo({pathname: '/home'})  }}>
                    <IconSymbol name='house.fill'></IconSymbol>
                    <ThemedText>Done</ThemedText>
                </ThemedButton>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignContent: 'center',
        justifyContent: 'center',
        outlineWidth: 2,
        outlineColor: '#000',
        padding: 10,
    },
});