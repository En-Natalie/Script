import { Container } from '@/components/ui/container';
import { PropsWithChildren } from 'react';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';

export function ImageBoxInput({ children }: PropsWithChildren) {
    return (
        <Container>
            { children }
            <ThemedButton color='red'>
                <IconSymbol name='trash.fill'></IconSymbol>
                <ThemedText>Remove</ThemedText>
            </ThemedButton>
        </Container>
    );
}