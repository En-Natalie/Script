import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { IconSymbol } from './icon-symbol';

export type HeaderProps = {
    title?: string
};

export function Header({ title, style, children }: SafeAreaViewProps & HeaderProps) {
    const iconName = title === "Home" ? "house.fill" : "paperplane.fill";

    return (
        <ThemedView>
            <SafeAreaView>
                <ThemedView color='accent' style={styles.default}>
                    {/* // TODO this doesn't work. dunno */}
                    <ThemedButton square={true}> 
                        <IconSymbol size={28} name={iconName} color={'#000'} />
                    </ThemedButton> 
                    <ThemedText type="title" style={{transform: [{translateY: 3}],}}>{title}</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        alignContent: 'center',
        borderBottomWidth: 2,
        padding: 10,
        borderColor: '#000',
        minHeight: 60,
        height: 60,
        maxHeight: 60,
        flex: 1,
    },
  });