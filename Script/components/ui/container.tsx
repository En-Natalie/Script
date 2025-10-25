import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button';

export function Container({ children }: PropsWithChildren) {
    return (
        <ThemedView color='containerBackground' style={styles.default}>
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