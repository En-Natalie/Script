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