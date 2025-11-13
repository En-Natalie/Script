import {StyleSheet, ScrollView, Text} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { useRouter } from 'expo-router'
import UserPassInput from "@/components/ui/user-pass-input";
import {ThemedText} from "@/components/themed-text";

export default function SignupScreen() {
    const router = useRouter();

    const signUp = (username: string, password: string) => {
        const valid = true; // TODO call Amalia's method!
        console.log("Sign up attempt with: " + username + " " + password);
        if (valid) {
            router.navigate('/home');
        }
        // TODO error message saying no
    }

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Log In' backPath='/index' ></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedText type={"emphasis"}> Sign up to Script!</ThemedText>
                </Container>

                <Container>
                    <UserPassInput onSubmitEditing={signUp} buttonText={'Sign Up'}/>
                </Container>

            </ThemedView>
        </ScrollView>
    )
}