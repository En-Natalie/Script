import { Container } from '@/components/ui/container';
import { PropsWithChildren } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';

export function ImageBoxInput({ children }: PropsWithChildren) {
    return (
        <Container>
            <Image source={require('@/assets/images/partial-react-logo.png')} />

            <ThemedButton color='red'>
                <ThemedText>Remove</ThemedText>
            </ThemedButton>
        </Container>
    );
}

const styles = StyleSheet.create({ // TODO actually use this
    fillWidth: {
        width: '100%',
    }
});