import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { useRouter } from 'expo-router'
import UserPassInput from "@/components/ui/user-pass-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {Colors} from "@/constants/theme";
import { setCurrentUsername} from "@/app/index";

export default function SignupScreen() {
    const router = useRouter();

    const signUp = (username: string, password: string) => {
        const valid = username != ''; // TODO call Amalia's method!
        console.log("Sign up attempt with: " + username + " " + password);
        if (valid) {
            router.replace('/home');
            setCurrentUsername(username);
        }
        else {
            console.log("bad username");
        }
        // TODO error message saying no
    }

    return (
        <ScrollView stickyHeaderIndices={[0]} automaticallyAdjustKeyboardInsets={true} style={{backgroundColor: Colors.default.background}}>
            <Header title='Sign Up' backPath='/signup' ></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedText type={"emphasis"}> Sign up to Script!</ThemedText>
                </Container>

                <Container>
                    <UserPassInput onSubmitEditing={signUp} buttonText={'Sign Up'}/>
                </Container>

                <Container>
                    <ThemedText type={"emphasis"}>Existing user?</ThemedText>
                    <ThemedButton onPress={() => router.replace('/')}>
                        <ThemedText>Log in!</ThemedText>
                        <IconSymbol name={'arrow.right'}></IconSymbol>
                    </ThemedButton>
                </Container>

            </ThemedView>
        </ScrollView>
    )
}