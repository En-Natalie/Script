import {StyleSheet, ScrollView, Text} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { useRouter } from 'expo-router'
import UserPassInput from "@/components/ui/user-pass-input";
import {ThemedText} from "@/components/themed-text";
import {ThemedButton} from "@/components/ui/themed-button";
import {IconSymbol} from "@/components/ui/icon-symbol";

export default function LoginScreen() {
    const router = useRouter();

    const logIn = (username: string, password: string) => {
        const valid = true; // TODO call Amalia's method!
        console.log("Login attempt with: " + username + " " + password);
        if (valid) {
            router.navigate('/home');
        }
        // TODO error message saying no
    }

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Log In' backPath='index' ></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedText type={"emphasis"} > Welcome back to Script!</ThemedText>
                </Container>

                <Container>
                    <UserPassInput onSubmitEditing={logIn} buttonText={'Log In'}/>
                    {/*<ThemedText style={styles.errorMessage} type={'error'}>Login failed. Incorrect username or password.</ThemedText>*/}
                </Container>

                <Container>
                    <ThemedText type={"emphasis"}>New user?</ThemedText>
                    <ThemedButton onPress={() => router.navigate('/signup')}>
                        <ThemedText>Sign up!</ThemedText>
                        <IconSymbol name={'arrow.right'}></IconSymbol>
                    </ThemedButton>
                </Container>

            </ThemedView>
        </ScrollView>
    )
}