import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Container } from './ui/container';

export type ThemedTextInputProps = TextInputProps & {
    text: string,
    type?: 'default' | 'emphasis' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextInput({ style, children }: ThemedTextInputProps) {
  const color = useThemeColor('text');

    return(
        <Container>
            <TextInput></TextInput>
        </Container>
    )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    width: 200,
    //keyboardType: email-address
    // max length
    // max lines
    // on submit editing
  },
});
