import { Container } from '@/components/ui/container';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedImage } from "@/components/themed-image";
import { setStringAsync } from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";

export type ImageBoxViewProps = {
    uri: string,
    width: number,
    height: number,
    description: string,
};

function ImageBoxView({ uri, width, height, description }: ImageBoxViewProps) {

    const saveImage = () => {
        console.log('saving image...');
        MediaLibrary.saveToLibraryAsync(uri).then(r => console.log("image saved!: " + r));
    }

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