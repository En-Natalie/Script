import { Container } from '@/components/ui/container';
import { Constants } from '@/constants/theme';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';

export function ImageBoxConfirm({ children }: PropsWithChildren) {
    return (
        <Container>
            <View style={styles.topButtons}>
                <ThemedButton color='red'>
                    <ThemedText>Remove</ThemedText>
                </ThemedButton>
                <ThemedButton color='green'>
                    <ThemedText>Approve</ThemedText>
                </ThemedButton>
            </View>
            { children }
            <ThemedText>
                This is the image description hahaha
            </ThemedText>
            <ThemedButton>
                <ThemedText>Regenerate</ThemedText>
            </ThemedButton>
            <ThemedButton>
                <ThemedText>Edit</ThemedText>
            </ThemedButton>
        </Container>
    );
}

const styles = StyleSheet.create({
    topButtons: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: Constants.default.borderRadius,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        gap: 100,
    },
});