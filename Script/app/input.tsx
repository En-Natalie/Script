import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ImageBoxInput } from '@/components/ui/image-box-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { Fragment, useState } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'
import {getImageAsync} from "expo-clipboard";
import {Colors} from "@/constants/theme";

export type ImageBuilder = {
    url: string;
    id: number;
    width: number;
    height: number;
}

export let globalImages: ImageBuilder[] = [];

export default function InputScreen() {
    const [images, setImages] = useState<ImageBuilder[]>([
    ]);
    const [nextId, setNextId] = useState<number>(0);

    const router = useRouter();

    // TODO why does it take so long ?? what..
    const pasteImage = async () => {
        const image = await getImageAsync({ format: 'png' })

        if (image?.data) {
            const newImages: ImageBuilder[] = images.slice(); // why .slice? react only triggers a rerender if the memory address of the array in the state changes

            newImages.push({
                url: image.data,
                id: nextId,
                height: image.size.height,
                width: image.size.width,
            })
            setNextId(nextId + 1);
            setImages(newImages);
        }
    }

    /**
     * Launches gallery, adds selected images to images array
     */
    const openGallery = async () => {
        console.log('Picking image...');

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 1,
        });

        // if images were actually selected
        if (!result.canceled) {
            console.log("NOT CANCELED!");
            const newImages: ImageBuilder[] = images.slice(); // why .slice? react only triggers a rerender if the memory address of the array in the state changes

            // add to newImages array, increment id
            for (let i = 0; i < result.assets.length; i++) {
                newImages.push({
                    url: result.assets[i].uri,
                    id: nextId + 1 + i,
                    width: result.assets[i].width,
                    height: result.assets[i].height,
                });
                setNextId(nextId + 1 + i); // why +i? because React doesn't actually update the state until the function is over
            }
            setImages(newImages);
        }
    };

    /**
     * Passed to remove buttons of ImageBoxInputs, remove image with a given id
     * @param id id of triggering ImageBoxInput, the one to be removed
     */
    const handleRemove = (id: number) => {
        const newImages = images.filter((ib => ib.id !== id));
        setImages(newImages);
    }

    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxInput
                id={ib.id}
                url={ib.url}
                width={ib.width}
                height={ib.height}
                onRemoveButtonPress={handleRemove}>
            </ImageBoxInput>
        </Fragment>
    );

    return (
        <View style={{flex: 1}}>
            <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1, flexGrow: 2, backgroundColor: Colors.default.background}}>
                <Header title='Input' backPath='/home' style={{flex: 1}}></Header>
                <ThemedView color='background'>
                    {imageBoxes}
                </ThemedView>
            </ScrollView>
            {/* Button menu */}
            <ThemedView color='accent' style={styles.buttonMenu}>
                <ThemedView color='accent' style={styles.verticalButtonMenu}>
                    <ThemedButton onPress={pasteImage}>
                        <IconSymbol name='doc.on.clipboard'></IconSymbol>
                        <ThemedText>Paste</ThemedText>
                    </ThemedButton>
                    {/*<ThemedButton>*/}
                    {/*    <IconSymbol name='paperclip'></IconSymbol>*/}
                    {/*    <ThemedText>Open Files</ThemedText>*/}
                    {/*</ThemedButton>*/}
                    <ThemedButton onPress={openGallery}>
                        <IconSymbol name='photo.fill.on.rectangle.fill'></IconSymbol>
                        <ThemedText>Gallery</ThemedText>
                    </ThemedButton>
                </ThemedView>

                <ThemedView color='accent'>
                    <ThemedButton onPress={() => {globalImages = images; router.navigate({pathname: '/confirm', params: { images: images.map(ib => JSON.stringify(ib)) } })}}>
                        <ThemedText>Continue</ThemedText>
                        <IconSymbol name='arrow.right'></IconSymbol>
                    </ThemedButton>
                </ThemedView>
            </ThemedView>
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
        height: 50,
        minHeight: 50,
        flex: 0.25,
        // flexGrow: 1,

        // position: 'absolute',
        // // marginTop: 'auto',
        // // marginBottom: 100,
        // bottom: -500,
        // // paddingBottom: 400,
        // bottom: 100, // TODO this is bad lmao
        // width: '100%'
    },
    verticalButtonMenu: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        alignContent: 'center',
        justifyContent: 'center',
    }
});