import { Container } from '@/components/ui/container';
import {Colors, Constants} from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedImage } from "@/components/themed-image";
import { setStringAsync} from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import {AdvancedImage} from "cloudinary-react-native";
import {Cloudinary} from "@cloudinary/url-gen";
import {PropsWithChildren} from "react";


export type ImageBoxHistoryProps = {
    description: string,
};

function ImageBoxHistory({ description, children }: ImageBoxHistoryProps & PropsWithChildren) {

    const saveImage = () => {
        console.log('saving image...');
        console.log('yeah this method does nothing right now lmao')

        // MediaLibrary.saveToLibraryAsync(children.)
        // MediaLibrary.saveToLibraryAsync(url).then(r => console.log("image saved!: " + r));
    }

    const copyText = async () => {
        await setStringAsync(description)
    }

    return (
        <Container>
            { children }

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

export default ImageBoxHistory

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