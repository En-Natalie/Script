import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Constants } from '@/constants/theme';
import { Href, useRouter} from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { IconSymbol } from './icon-symbol';
import { SFSymbols6_0 } from 'sf-symbols-typescript';
import { ThemedButton } from "@/components/ui/themed-button";

export type HeaderProps = {
    title?: string,
    backPath: "/" | '/signup' | '/home' | "/credits" | "/input" | "/confirm",
};

/**
 * Header displayed at the top of all pages
 * @param title text to display in header
 * @param backPath path to take when back button is pressed
 * @param style additional styling
 * @param children additional children
 */
export function Header({ title = "TODO", backPath, style, children }: SafeAreaViewProps & HeaderProps) {
    const router = useRouter();

    const iconName: SFSymbols6_0 = title === "Home" || title === "Log In" || title === "Sign Up" ?
        'house.fill' : 'arrow.left';

    const buttonOnPress = (title === "Home" || title === "Log In" || title === "Sign Up") ?
        () => {} :
        () => router.dismissTo(backPath as Href);

    return (
        <ThemedView>
            <SafeAreaView>
                <ThemedView color='accent' style={styles.default}>
                    <ThemedButton onPress={buttonOnPress} style={styles.backLink}>
                        <IconSymbol size={28} name={iconName} color={Colors.default.text} />
                    </ThemedButton>
                    <ThemedText type="title" style={{transform: [{translateY: 5}],}}>{title}</ThemedText>
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
        maxWidth: 43,
    },
  });