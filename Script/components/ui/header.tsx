import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Constants } from '@/constants/theme';
import { Href, Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { IconSymbol } from './icon-symbol';
import { SFSymbols6_0 } from 'sf-symbols-typescript';

export type HeaderProps = {
    title?: string,
    backPath: "index" | "credits" | "home" | "input" | "confirm",
};

export function Header({ title = "TODO", backPath, style, children }: SafeAreaViewProps & HeaderProps) {
    const iconName: SFSymbols6_0 = title === "Home" ? 'house.fill' : 'arrow.right';

    return (
        <ThemedView>
            <SafeAreaView>
                <ThemedView color='accent' style={styles.default}>
                    <Link href={backPath as Href} style={styles.backLink}>
                        <IconSymbol size={28} name={'house.fill'} color={'#000'} />
                    </Link>                    
                    <ThemedText type="title" style={{transform: [{translateY: 4}],}}>{title}</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
        alignContent: 'center',
        borderBottomWidth: Constants.default.outlineWidth,
        padding: 10,
        borderColor: Colors.default.border,
        minHeight: 60,
        height: 60,
        maxHeight: 60,
        flex: 1,
    },
    backLink: {
        padding: 5,
        borderRadius: Constants.default.borderRadius,
        outlineColor: Colors.default.border,
        outlineWidth: Constants.default.outlineWidth,
        backgroundColor: Colors.default.button,
    },
    touchableOpacity: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    }
  });