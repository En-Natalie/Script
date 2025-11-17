import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ImageBoxInput } from '@/components/ui/image-box-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { Colors } from "@/constants/theme";
import { HuggingFaceClient, ImageAnalyzer } from '@/functionality/ai';
import { HUGGING_FACE_KEY, HUGGING_FACE_MODEL } from '@/functionality/env';
import { getImageAsync } from "expo-clipboard";
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, View } from 'react-native';

/**
 * Components necessary to display an image on the input screen.
 */
export type ImageBuilder = {
    uri: string;
    id: number;
    width: number;
    height: number;
    description?: string; // AI-generated description
}

/**
 * Images inputted on the input screen.
 */
export let globalImages: ImageBuilder[] = [];

/**
 * Screen where user inputs images to be given IDs.
 */
export default function InputScreen() {
    const [images, setImages] = useState<ImageBuilder[]>([
    ]);
    const [nextId, setNextId] = useState<number>(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const router = useRouter();

    /**
     * Add an image to the input screen from the keyboard.
     * TODO why does it take so long ?? what..
     */
    const pasteImage = async () => {
        const image = await getImageAsync({ format: 'png' })

        if (image?.data) {
            const newImages: ImageBuilder[] = images.slice(); // why .slice? react only triggers a rerender if the memory address of the array in the state changes

            newImages.push({
                uri: image.data,
                id: nextId,
                height: image.size.height,
                width: image.size.width,
            })
            setNextId(nextId + 1);
            setImages(newImages);
        }
    }

    /**
     * Launch gallery, add selected images to images array.
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
                    uri: result.assets[i].uri,
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

    /**
     * ImageBoxInputs to be displayed on the input screen.
     */
    const imageBoxes = images.map(ib =>
        <Fragment key={ib.id}>
            <ImageBoxInput
                id={ib.id}
                uri={ib.uri}
                width={ib.width}
                height={ib.height}
                onRemoveButtonPress={handleRemove}>
            </ImageBoxInput>
        </Fragment>
    );

    /**
     * Analyze images and continue to the next screen.
     * Sets a loading state, stores the selected images globally, performs (or simulates) analysis,
     * and then navigates; this ensures the analyzeAndContinue reference used by the button exists.
     */
    const analyzeAndContinue = async (imgs: ImageBuilder[]) => {
        setIsAnalyzing(true);
        try {

            // Set up AI client if credentials are available
            let analyzer: ImageAnalyzer | null = null;
            console.log('HUGGING_FACE_KEY preview:', HUGGING_FACE_KEY ? (String(HUGGING_FACE_KEY).slice(0,8) + '...') : '<empty>');
            console.log('HUGGING_FACE_MODEL:', HUGGING_FACE_MODEL);

            // Attempt to construct a HuggingFaceClient even if values look absent; constructor will throw with a clear message if missing.
            try {
                const modelToUse = (HUGGING_FACE_MODEL && String(HUGGING_FACE_MODEL).length > 0)
                    ? String(HUGGING_FACE_MODEL)
                    : 'Salesforce/blip-image-captioning-base';
                console.log('Using HF model:', modelToUse);
                const client = new HuggingFaceClient(HUGGING_FACE_KEY, modelToUse);
                analyzer = new ImageAnalyzer(client);
                console.log('Using HuggingFaceClient for image analysis');
            } catch (err) {
                console.warn('HuggingFaceClient construction failed, falling back to local analyzer:', err);
                analyzer = new ImageAnalyzer();
            }

            // Convert images and analyze them in parallel
            const analyzedImages = await Promise.all(
                imgs.map(async (image: ImageBuilder) => {
                    try {
                        let dataUri = image.uri;
                        if (image.uri.startsWith('file://')) {
                            const fileContent = await FileSystem.readAsStringAsync(
                                image.uri,
                                { encoding: FileSystem.EncodingType.Base64 }
                            );
                            dataUri = `data:image/jpeg;base64,${fileContent}`;
                        }

                        const description = await analyzer!.analyzeImage(
                            { url: dataUri },
                            'Generate a concise, descriptive caption for this image in one sentence.',
                            { originalUri: image.uri }
                        );
                        console.log('AI description for', image.id, ':', description);

                        return {
                            ...image,
                            description,
                        };
                    } catch (err) {
                        console.error('Error analyzing image:', err);
                        return {
                            ...image,
                            description: 'Unable to generate description',
                        };
                    }
                })
            );

            // Store analyzed images globally for confirm screen (include descriptions)
            globalImages = analyzedImages;

            // Navigate to confirm with analyzed images
            router.push({
                pathname: '/confirm' as any,
                params: { images: JSON.stringify(analyzedImages) },
            });
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1, flexGrow: 2, backgroundColor: Colors.default.background}}>
                <Header title='Input' backPath='/home' style={{flex: 1}}></Header>
                <ThemedView color='background'>
                    {imageBoxes}
                </ThemedView>
            </ScrollView>
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
                    <ThemedButton onPress={() => analyzeAndContinue(images)}>
                        <ThemedText>Continue</ThemedText>
                        <IconSymbol name='arrow.right'></IconSymbol>
                    </ThemedButton>
                </ThemedView>
            </ThemedView>

            {/* Loading overlay while analyzing images */}
            <Modal transparent animationType="fade" visible={isAnalyzing}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <ThemedView color='background' style={{ padding: 20, borderRadius: 10, gap: 10, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.default.text} />
                        <ThemedText>Analyzing images...</ThemedText>
                    </ThemedView>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    /**
     * Used to display paste/gallery and continue buttons side by side
     */
    buttonMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignContent: 'center',
        justifyContent: 'center',
        outlineWidth: 2,
        outlineColor: Colors.default.border,
        padding: 10,
        height: 50,
        minHeight: 50,
        flex: 0.25,
    },

    /**
     * Used to display the paste/gallery buttons vertically on top of one another
     */
    verticalButtonMenu: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        alignContent: 'center',
        justifyContent: 'center',
    }
});