import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { useRouter } from 'expo-router'
import UserPassInput from "@/components/ui/user-pass-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { setCurrentUsername} from "@/app/index";
import { useState } from "react";

/**
 * Screen that allows user to sign up via entering a username and password
 * or navigate to the log in screen.
 */
export default function SignupScreen() {
    const router = useRouter();

    const [displayError, setDisplayError] = useState(false);

    const signUp = (username: string, password: string) => {
        const valid = username != ''; // TODO call Amalia's method!
        console.log("Sign up attempt with: " + username + " " + password);
        if (valid) {
            router.replace('/home');
            setCurrentUsername(username);
        }
        else {
            console.log("bad username");
            setDisplayError(true);
        }
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
                    { displayError &&
                        <View style={styles.errorContainer}>
                            <IconSymbol name={'exclamationmark.circle'} style={styles.icon} color={Colors.default.error} size={20}/>
                            <ThemedText type={'error'}>Invalid username or password, please try again.</ThemedText>
                        </View>
                    }
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

const styles = StyleSheet.create({
    errorContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 10,
    },
    icon: {
        marginTop: 1,
    }
})