import { Container } from '@/components/ui/container';
import { Constants } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedView } from '../themed-view';
import { ThemedImage } from "@/components/themed-image";
import {setImageAsync, setStringAsync} from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";

export type ImageBoxViewProps = {
    id: number,
    url: string,
    width: number,
    height: number,
    description: string,
};


function ImageBoxView({ id, url, width, height, description }: ImageBoxViewProps) {

    const saveImage = () => {
        console.log('saving image...');
        MediaLibrary.saveToLibraryAsync(url).then(r => console.log("image saved!: " + r));
    }

    const copyImage = async () => {
        // const base64 = await FileSystem.readAsStringAsync(url, { encoding: 'base64' }); // this may be a thing? but unsure.
        await setImageAsync(url)
    }

    const copyText = async () => {
        await setStringAsync(description)
    }

    return (
        <Container>
            <ThemedImage url={url} width={width} height={height}/>

            <ThemedText>
                {description}
            </ThemedText>
            
            <ThemedView color='container' style={styles.imageButtons} >
                <ThemedButton onPress={saveImage}>
                    <IconSymbol name='square.and.arrow.down'></IconSymbol>
                    <ThemedText>Save Image</ThemedText>
                </ThemedButton>
                <ThemedButton onPress={copyImage}>
                    <IconSymbol name='photo.fill.on.rectangle.fill'></IconSymbol>
                    <ThemedText>Copy Image</ThemedText>
                </ThemedButton>
            </ThemedView>
            
            <ThemedButton onPress={copyText}>
                <IconSymbol name='doc.on.clipboard'></IconSymbol>
                <ThemedText>Copy ID Text</ThemedText>
            </ThemedButton>
        </Container>
    );
}

export default ImageBoxView

const styles = StyleSheet.create({
    imageButtons: {
        flexDirection: 'row',
        borderRadius: Constants.default.borderRadius,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        gap: 10,
    },
});