import { Container } from '@/components/ui/container';
import { Constants } from '@/constants/theme';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';

export function ImageBoxConfirm({ children }: PropsWithChildren) {
    return (
        <Container>
            <View style={styles.topButtons}>
                <ThemedButton color='red'>
                    <IconSymbol name='trash.fill'></IconSymbol>
                    <ThemedText>Remove</ThemedText>
                </ThemedButton>
                <ThemedButton color='green'>
                    <IconSymbol name='hand.thumbsup.fill'></IconSymbol>
                    <ThemedText>Approve</ThemedText>
                </ThemedButton>
            </View>
            { children }
            <ThemedText>
                This is the image description hahaha
            </ThemedText>
            <ThemedButton>
                <IconSymbol name='repeat'></IconSymbol>
                <ThemedText>Regenerate</ThemedText>
            </ThemedButton>
            <ThemedButton>
                <IconSymbol name='pencil.tip.crop.circle.badge.plus'></IconSymbol>
                <ThemedText>Edit</ThemedText>
            </ThemedButton>
        </Container>
    );
}

const styles = StyleSheet.create({
    topButtons: {
        flexDirection: 'row',
        borderRadius: Constants.default.borderRadius,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        gap: 30,
    },
});