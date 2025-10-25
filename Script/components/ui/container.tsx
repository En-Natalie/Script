import { ThemedView } from '@/components/themed-view';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

export function Container({ children }: PropsWithChildren) {
    return (
        <ThemedView color='container' style={styles.default}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 20,
        padding: 15,
        borderRadius: 10,
        outlineColor: '#000',
        outlineWidth: 2,
    },
});