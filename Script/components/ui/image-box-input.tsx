import { Container } from '@/components/ui/container';
import { PropsWithChildren } from 'react';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';

export function ImageBoxInput({ children }: PropsWithChildren) {
    return (
        <Container>
            { children }
            <ThemedButton color='red'>
                <ThemedText>Remove</ThemedText>
            </ThemedButton>
        </Container>
    );
}