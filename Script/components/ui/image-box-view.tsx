import { ThemedImage } from "@/components/themed-image";
import { Container } from '@/components/ui/container';
import { setStringAsync } from "expo-clipboard";
import { ThemedText } from '../themed-text';
import { IconSymbol } from './icon-symbol';
import { ThemedButton } from './themed-button';
// @ts-ignore: expo-media-library has no bundled types in this project
import * as MediaLibrary from "expo-media-library";

export type ImageBoxViewProps = {
    uri: string,
    width: number,
    height: number,
    description: string,
};

/**
 * Component to display images on the results screen
 * @param uri uri of image to display
 * @param width width of image to display
 * @param height height of image to display
 * @param description image description to display alongside image
 */
function ImageBoxView({ uri, width, height, description }: ImageBoxViewProps) {

    /**
     * Save image to gallery.
     */
    const saveImage = () => {
        console.log('saving image...');
        MediaLibrary.saveToLibraryAsync(uri).then((r: any) => console.log("image saved!: " + r));
    }

    /**
     * Copy image description to keyboard.
     */
    const copyText = async () => {
        await setStringAsync(description)
    }

    return (
        <Container>
            <ThemedImage uri={uri} width={width} height={height}/>

            <ThemedText>
                {description}
            </ThemedText>
            
            <ThemedButton onPress={saveImage}>
                <IconSymbol name='square.and.arrow.down'></IconSymbol>
                <ThemedText>Save Image</ThemedText>
            </ThemedButton>

            <ThemedButton onPress={copyText}>
                <IconSymbol name='doc.on.clipboard'></IconSymbol>
                <ThemedText>Copy ID Text</ThemedText>
            </ThemedButton>
        </Container>
    );
}

export default ImageBoxView