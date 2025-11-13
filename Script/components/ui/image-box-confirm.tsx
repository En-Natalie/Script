import { Container } from '@/components/ui/container';
import { Constants } from '@/constants/theme';
import {PropsWithChildren, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from './themed-button';
import { IconSymbol } from './icon-symbol';
import {ThemedImage} from "@/components/themed-image";

export type ImageBoxConfirmProps = {
    id: number,
    url: string,
    width: number,
    height: number,
    description: string,
    onRemoveButtonPress: (id: number) => void,
};

export function ImageBoxConfirm({id, url, width, height, description = 'hehh heh description', onRemoveButtonPress}: ImageBoxConfirmProps) {
    const onRegenerateButton = () => {
        console.log('Regenerate button' + id);
        setText("");
    }

    const onEditButtonPress = () => {
        console.log('Edit button' + id);
        setText(text + "0");
    }

    const onApproveButtonPress = () => {
        console.log('Approve button' + id);
        onRemoveButtonPress(id);
    }

    const [text, setText] = useState<string>('');

    return (
        <Container>
            <View style={styles.topButtons}>
                <ThemedButton color='red' onPress={onRemoveButtonPress.bind(null, id)}>
                    <IconSymbol name='trash.fill'></IconSymbol>
                    <ThemedText>Remove</ThemedText>
                </ThemedButton>
                <ThemedButton color='green' onPress={onApproveButtonPress}>
                    <IconSymbol name='hand.thumbsup.fill'></IconSymbol>
                    <ThemedText>Approve</ThemedText>
                </ThemedButton>
            </View>
            <ThemedImage url={url} width={width} height={height}/>

            <ThemedText>
                {description}
            </ThemedText>

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