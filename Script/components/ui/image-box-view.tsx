import { Container } from '@/components/ui/container';
import { Colors, Constants } from '@/constants/theme';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedView } from '../themed-view';

export function ImageBoxView({ children }: PropsWithChildren) {
    return (
        <Container>
            { children }
            <ThemedText>
                This is the image description hahaha
            </ThemedText>
            
            <ThemedView color='container' style={styles.imageButtons} >
                <ThemedButton>
                    <IconSymbol name='square.and.arrow.down'></IconSymbol>
                    <ThemedText>Save Image</ThemedText>
                </ThemedButton>
                <ThemedButton>
                    <IconSymbol name='photo.fill.on.rectangle.fill'></IconSymbol>
                    <ThemedText>Copy Image</ThemedText>
                </ThemedButton>
            </ThemedView>
            
            <ThemedButton>
                <IconSymbol name='doc.on.clipboard'></IconSymbol>
                <ThemedText>Copy ID Text</ThemedText>
            </ThemedButton>
        </Container>
    );
}

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