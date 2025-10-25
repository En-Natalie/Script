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
import { SafeAreaView } from 'react-native-safe-area-context';

export function Header({ title, children }: PropsWithChildren & { title: string }) {
    return (
        <SafeAreaView>
            <ThemedView color='accent' style={styles.default}>
                <Button></Button> 
                <ThemedText type="title">{title}</ThemedText>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    default: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      alignContent: 'center',
    },
  });