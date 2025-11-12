import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ImageBoxInput } from '@/components/ui/image-box-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'

type ImageBuilder = {
    url: string;
    id: number;
    width: number;
    height: number;
}

export default function InputScreen() {
    const [images, setImages] = useState<ImageBuilder[]>([
    ]);
    const [nextId, setNextId] = useState<number>(0);

    const router = useRouter();

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

        console.log(result);

        // if images were actually selected
        if (!result.canceled) {
            console.log("NOT CANCELED!");
            let newImages: ImageBuilder[] = images.slice(); // why .slice? react only triggers a rerender if the memory address of the array in the state changes

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

    const imageBoxInputs = images.map(ib =>
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
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Input' backPath='home'></Header>
            <ThemedView color='background'>
                {imageBoxInputs}
            </ThemedView>

            {/* Button menu */}
            <ThemedView color='accent' style={styles.buttonMenu}>

            <ThemedView color='accent' style={styles.verticalButtonMenu}>
                <ThemedButton>
                    <IconSymbol name='doc.on.clipboard'></IconSymbol>
                    <ThemedText>Paste</ThemedText>
                </ThemedButton>
                <ThemedButton>
                    <IconSymbol name='paperclip'></IconSymbol>
                    <ThemedText>Open Files</ThemedText>
                </ThemedButton>
                <ThemedButton onPress={openGallery}>
                    <IconSymbol name='photo.fill.on.rectangle.fill'></IconSymbol>
                    <ThemedText>Gallery</ThemedText>
                </ThemedButton>
            </ThemedView>

            <ThemedView color='accent'>
                <ThemedButton onPress={() => router.navigate('/confirm')}>
                    <ThemedText>Continue</ThemedText>
                    <IconSymbol name='arrow.right'></IconSymbol>
                </ThemedButton>
            </ThemedView>

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
        // position: 'absolute',
        // bottom: 60, // TODO this is bad lmao
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