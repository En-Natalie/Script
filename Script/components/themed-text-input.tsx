import { Colors, Constants } from '@/constants/theme';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import {Ref} from "react";

export type ThemedTextInputProps = TextInputProps & {
    placeholder: string,
    type?: 'default' | 'emphasis' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link',
    onChangeText: (text: string) => void,
    onSubmitEditing?: () => void,
    clearTextOnFocus?: boolean,
    ref?: Ref<TextInput>,
    useConfirmStyle?: boolean,
    defaultValue?: string,
};

export function ThemedTextInput({ placeholder, style, clearTextOnFocus = false, onChangeText, onSubmitEditing, ref, useConfirmStyle = false, defaultValue = '', children }: ThemedTextInputProps) {
    return(
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.default.background}
            defaultValue={useConfirmStyle ? defaultValue : ''}
            style={useConfirmStyle ? [styles.alternate, style] : [styles.default, style]}
            autoComplete='off'
            clearTextOnFocus={clearTextOnFocus}
            multiline={useConfirmStyle}
            maxLength={useConfirmStyle ? undefined : 20}
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={onSubmitEditing}
            ref={ref}>
        </TextInput>
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 20,
        //keyboardType: email-address
        // max length
        // max lines
        padding: 5,
        borderRadius: Constants.default.borderRadius,
        outlineColor: Colors.default.border,
        outlineWidth: Constants.default.outlineWidth,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        height: 40,
    },
    alternate: {
        fontSize: 16,
        lineHeight: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        textAlign: 'center',
    }
});
