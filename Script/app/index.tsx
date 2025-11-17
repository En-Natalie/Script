import { ThemedText } from "@/components/themed-text";
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedButton } from "@/components/ui/themed-button";
import UserPassInput from "@/components/ui/user-pass-input";
import { Colors } from "@/constants/theme";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ScrollView, StyleSheet, View } from 'react-native';

/**
 * The currently logged-in user's username.
 */
export let currentUsername: string = '';

/**
 * Set the current logged-in user's username.
 * @param username username of who is logged in
 */
export function setCurrentUsername(username: string): void { currentUsername = username; }

/**
 * Screen that allows user to log in via entering their username and password
 * or navigate to the sign up screen.
 */
export default function LoginScreen() {
    const router = useRouter();

    const [displayError, setDisplayError] = useState(false);

    const logIn = (username: string, password: string) => {
        const valid = username != ''; // TODO call Amalia's method!
        console.log("Login attempt with: " + username + " " + password);
            if (valid) {
            router.replace('/home' as any);
            currentUsername = username;
        }
        else {
            console.log("bad username");
            setDisplayError(true);
        }
    }

    return (
        <ScrollView stickyHeaderIndices={[0]} automaticallyAdjustKeyboardInsets={true} style={{backgroundColor: Colors.default.background}}>
            <Header title='Log In' backPath='/' ></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedText type={"emphasis"} > Welcome back to Script!</ThemedText>
                </Container>

                <Container>
                    <UserPassInput onSubmitEditing={logIn} buttonText={'Log In'}/>
                    { displayError &&
                        <View style={styles.errorContainer}>
                            <IconSymbol name={'exclamationmark.circle'} style={styles.icon} color={Colors.default.error} size={20}/>
                            <ThemedText type={'error'}>Invalid username or password, please try again.</ThemedText>
                        </View>
                    }
                </Container>

                <Container>
                    <ThemedText type={"emphasis"}>New user?</ThemedText>
                    <ThemedButton onPress={() => router.replace('/signup' as any)}>
                        <ThemedText>Sign up!</ThemedText>
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