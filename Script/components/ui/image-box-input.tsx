import { Container } from '@/components/ui/container';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import {ThemedImage} from "@/components/themed-image";

export type ImageBoxInputProps = {
    id: number,
    url: string,
    onRemoveButtonPress: (id: number) => void,
};

export function ImageBoxInput({id, url, onRemoveButtonPress}: ImageBoxInputProps) {
    return (
        <Container>
            <ThemedImage url={url}/>
            <ThemedButton color='red' onPress={onRemoveButtonPress.bind(null, id)}>
                <IconSymbol name='trash.fill'></IconSymbol>
                <ThemedText>Remove</ThemedText>
            </ThemedButton>
        </Container>
    );
}