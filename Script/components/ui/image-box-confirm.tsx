import { Container } from '@/components/ui/container';
import { Constants } from '@/constants/theme';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import { ThemedImage } from "@/components/themed-image";
import { ThemedTextInput } from "@/components/themed-text-input";

export type ImageBoxConfirmProps = {
    id: number,
    url: string,
    width: number,
    height: number,
    description: string,
    onAcceptButtonPress: (id: number, updatedDescription: string) => void,
    onRemoveButtonPress: (id: number) => void,
};

export function ImageBoxConfirm(this: any, {id, url, width, height, description = 'hehh heh description', onAcceptButtonPress, onRemoveButtonPress}: ImageBoxConfirmProps) {
    const onRegenerateButton = () => {
        console.log('Regenerate button' + id);
        setText('');
    }

    const textInputRef = useRef<TextInput>(null);
    const onEditButtonPress = () => {
        console.log('Edit button' + id);
        setText(text + "0");
        if (textInputRef.current) {
            // textInputRef.current = true;
            textInputRef.current.focus();
        }
    }
    const onEditingFinished = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    }

    const [text, setText] = useState<string>(description);

    return (
        <Container>
            <View style={styles.topButtons}>
                <ThemedButton color='red' onPress={onRemoveButtonPress.bind(null, id)}>
                    <IconSymbol name='trash.fill'></IconSymbol>
                    <ThemedText>Remove</ThemedText>
                </ThemedButton>
                <ThemedButton color='green' onPress={onAcceptButtonPress.bind(null, id, text)}>
                    <IconSymbol name='hand.thumbsup.fill'></IconSymbol>
                    <ThemedText>Approve</ThemedText>
                </ThemedButton>
            </View>
            <ThemedImage url={url} width={width} height={height}/>

            <ThemedTextInput
                useConfirmStyle={true}
                placeholder={'This is a placeholder'}
                defaultValue={text}
                onChangeText={setText}
                onSubmitEditing={onEditingFinished}
                ref={textInputRef}>
            </ThemedTextInput>

            <ThemedButton onPress={onRegenerateButton}>
                <IconSymbol name='repeat'></IconSymbol>
                <ThemedText>Regenerate</ThemedText>
            </ThemedButton>

            <ThemedButton onPress={onEditButtonPress}>
                <IconSymbol name='pencil.tip.crop.circle.badge.plus'></IconSymbol>
                <ThemedText>Edit</ThemedText>
            </ThemedButton>
        </Container>
    );
}

const styles = StyleSheet.create({
    topButtons: {
        flexDirection: 'row',
        borderRadius: Constants.default.borderRadius,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        gap: 30,
    },
});