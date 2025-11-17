import { Container } from '@/components/ui/container';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedImage } from "@/components/themed-image";

export type ImageBoxInputProps = {
    id: number,
    uri: string,
    width: number,
    height: number,
    onRemoveButtonPress: (id: number) => void,
};

/**
 * Component to display images on the input screen
 * @param id identifying number for this component, used to differentiate self from others
 * @param uri uri of image to display *
 * @param width width of image to display
 * @param height height of image to display * @param onRemoveButtonPress
 * @param onRemoveButtonPress what to do when remove button is pressed
 */
export function ImageBoxInput({id, uri, width, height, onRemoveButtonPress}: ImageBoxInputProps) {
    return (
        <Container>
            <ThemedImage uri={uri} width={width} height={height}/>
            <ThemedButton color='red' onPress={onRemoveButtonPress.bind(null, id)}>
                <IconSymbol name='trash.fill'></IconSymbol>
                <ThemedText>Remove</ThemedText>
            </ThemedButton>
        </Container>
    );
}