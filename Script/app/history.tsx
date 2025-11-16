import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedButton } from '@/components/ui/themed-button';
import {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { useRouter } from 'expo-router'
import ImageBoxView from "@/components/ui/image-box-view";
import {acceptedImages, ImageCBuilder, resetAcceptedImages} from './confirm'
import {AdvancedImage} from "cloudinary-react-native";
import {Cloudinary} from "@cloudinary/url-gen";
import {Colors} from "@/constants/theme";

export type ImageBuilder = {
    url: string;
    id: number;
    width: number;
    height: number;
}

// Use the image with public ID, 'front_face'.
// const myImage = cloudinary.image('Screenshot_2025-09-26_at_9.40.51_PM_jox13m');
// const myImage = cloudinary.image('')
// <AdvancedImage cldImg={myImage} style={{ width: 200, height: 25, alignSelf: 'center'}} />

export default function HistoryScreen() {
    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: "script-cs",
        },
        url: {
            secure: true
        }
    });



    const [images, setImages] = useState<ImageCBuilder[]>([
        // {
        //     url: "asdfasdf",
        //     id: 100,
        //     width: 20,
        //     height: 20,
        //     description: "bad image lmao"
        // }
    ]);

    useEffect(() => {
        setImages(acceptedImages);
    }, [setImages]);

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <AdvancedImage
                cldImg={cloudinary.image('jssgqpcmexr5lt1738i8')}
                style={{
                    width: 200,
                    height: 100,
                    alignSelf: 'center'}} />
        </Fragment>
    );

    return (
        <View style={{flex: 1}}>

            <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: Colors.default.background}}>
                <Header title='History' backPath='/home'></Header>
                <ThemedView color='background'>
                    <AdvancedImage
                        cldImg={cloudinary.image('jssgqpcmexr5lt1738i8')}
                        style={{
                            width: 200,
                            height: 100,
                            alignSelf: 'center'}} />
                    {imageBoxes}
                </ThemedView>
            </ScrollView>

            {/*<ThemedView color='accent' style={styles.buttonMenu}>*/}
            {/*    <ThemedButton onPress={() => { resetAcceptedImages(); router.dismissTo({pathname: '/home'})  }}>*/}
            {/*        <IconSymbol name='house.fill'></IconSymbol>*/}
            {/*        <ThemedText>Done</ThemedText>*/}
            {/*    </ThemedButton>*/}
            {/*</ThemedView>*/}
        </View>
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
        height: 20,
        minHeight: 20,
        flex: 0.10,
    },
});