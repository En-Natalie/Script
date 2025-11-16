import { ThemedTextInput } from '@/components/themed-text-input';
import { PropsWithChildren, useRef, useState } from 'react'
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedButton } from "@/components/ui/themed-button";
import { TextInput } from "react-native";

export type UserPassInputProps = {
    onSubmitEditing: (username: string, password: string) => void,
    buttonText: string,
}

export default function UserPassInput({onSubmitEditing, buttonText, children}: UserPassInputProps & PropsWithChildren) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const passwordInputRef = useRef<TextInput>(null);
    const focusPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }

    return (
        <>
            <ThemedTextInput
                placeholder="Username"
                onChangeText={setUsername}
                onSubmitEditing={focusPassword}>
            </ThemedTextInput>
            <ThemedTextInput
                placeholder="Password"
                onChangeText={setPassword}
                onSubmitEditing={() => onSubmitEditing(username, password)}
                ref={passwordInputRef}>
            </ThemedTextInput>
            <ThemedButton onPress={() => onSubmitEditing(username, password)}>
                <ThemedText>{buttonText}</ThemedText>
                <IconSymbol name='arrow.right'></IconSymbol>
            </ThemedButton>
            {children}
        </>
    )
}