import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './icon-symbol';

export type HeaderProps = {
    title?: string
};

export function Header({ title, children }: PropsWithChildren & HeaderProps) {
    const iconName = title === "Home" ? "house.fill" : "paperplane.fill";

    return (
        <SafeAreaView>
            <ThemedView color='accent' style={styles.default}>
                <ThemedButton>
                    <IconSymbol size={28} name={iconName} color={'#000'} />,
                </ThemedButton> 
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
      outlineWidth: 2,
      outlineColor: '#000',
    },
  });