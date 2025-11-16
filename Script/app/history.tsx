import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AdvancedImage} from "cloudinary-react-native";
import {Cloudinary} from "@cloudinary/url-gen";
import {Colors, Constants} from "@/constants/theme";
import {getImagesOfUsername, ImageStorageEntry} from "@/functionality/data-storage";
import {currentUsername} from "@/app/index";
import * as MediaLibrary from "expo-media-library";
import ImageBoxHistory from "@/components/ui/image-box-history";

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

    type ImageHBuilder = {
        id: number;
        publicID: string;
        description: string;
        width: number;
        height: number;
    }

    const [images, setImages] = useState<ImageHBuilder[]>([]);

    useEffect(() => {
        const newImages: ImageHBuilder[] = [];
        const entries: ImageStorageEntry[] = getImagesOfUsername(currentUsername);

        let i = 0;
        entries.forEach(entry => {
            newImages.push({
                id: i,
                publicID: entry.publicID,
                description: entry.description,
                width: entry.width,
                height: entry.height,
            })
            i++;
        })

        setImages(newImages);

    }, [setImages]);

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxHistory description={ib.description}>
                <AdvancedImage
                    cldImg={cloudinary.image(ib.publicID)}
                    style={{
                        borderWidth: Constants.default.outlineWidth,
                        borderColor: Colors.default.border,
                        borderRadius: Constants.default.borderRadius,
                        flex: 1,
                        resizeMode: 'cover',
                        width: '100%',
                        aspectRatio: ib.width / ib.height,
                    }} />
            </ImageBoxHistory>
        </Fragment>
    );

    // const saveImage = (id: number) => {
    //     const image = images.find(i => i.id === id);
    //     if (image) {
    //         MediaLibrary.saveToLibraryAsync(url).then(r => console.log("image saved!: " + r));
    //     }
    // }

    return (
        <View style={{flex: 1}}>

            <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: Colors.default.background}}>
                <Header title='History' backPath='/home'></Header>
                <ThemedView color='background'>
                    {/*<AdvancedImage*/}
                    {/*    cldImg={cloudinary.image('jssgqpcmexr5lt1738i8')}*/}
                    {/*    style={{*/}
                    {/*        width: 200,*/}
                    {/*        height: 100,*/}
                    {/*        alignSelf: 'center'}} />*/}
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