import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { useRouter } from 'expo-router'
import UserPassInput from "@/components/ui/user-pass-input";

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
            <Header title='Log In' backPath='index' ></Header>
            <ThemedView color='background'>

                <Container>
                    <UserPassInput onSubmitEditing={logIn} buttonText={'Log In'}/>
                </Container>

                <Container>
                    <UserPassInput onSubmitEditing={signUp} buttonText={'Sign Up'}/>
                </Container>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({ // TODO hey what's this for??
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
