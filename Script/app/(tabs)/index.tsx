import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { ThemedButton } from '@/components/ui/themed-button';
import { ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function LoginScreen() {
    const router = useRouter();

    const logIn = () => {
        const valid = true; // TODO call Amalia's method!
        if (valid) {
            router.navigate('/home');
        }
        // TODO error message saying no
    }

    const signUp = () => {
        const valid = true; // TODO call Amalia's method!
        if (valid) {
            router.navigate('/home');
        }
        // TODO error message saying no
    }

    const [signInUsername, setSignInUsername] = useState<string>("");
    const [signInPassword, setSignInPassword] = useState<string>("");
    const [logInUsername, setLogInUsername] = useState<string>("");
    const [logInPassword, setLogInPassword] = useState<string>("");

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Log In' backPath='index' ></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedTextInput placeholder="Username"></ThemedTextInput>
                    <ThemedTextInput placeholder="Password"></ThemedTextInput>

                    <ThemedButton onPress={() => logIn}>
                        <ThemedText>Log In</ThemedText>
                        <IconSymbol name='arrow.right'></IconSymbol>
                    </ThemedButton>
                </Container>

                <Container>
                    <ThemedTextInput placeholder="Username"></ThemedTextInput>
                    <ThemedTextInput placeholder="Password"></ThemedTextInput>

                    <ThemedButton onPress={() => signUp}>
                        <ThemedText>Sign Up</ThemedText>
                        <IconSymbol name='arrow.right'></IconSymbol>
                    </ThemedButton>
                </Container>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
