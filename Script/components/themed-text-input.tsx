import { Colors, Constants } from '@/constants/theme';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
    placeholder: string,
    type?: 'default' | 'emphasis' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextInput({ placeholder, style, children }: ThemedTextInputProps) {
  const color = useThemeColor('text');

    return(
        <TextInput 
            placeholder={placeholder}
            placeholderTextColor={Colors.default.background}
            style={[styles.default, style]}>
        </TextInput>
    )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    //keyboardType: email-address
    // max length
    // max lines
    // on submit editing TODO
    padding: 5,
    borderRadius: Constants.default.borderRadius,
    outlineColor: Colors.default.border,
    outlineWidth: Constants.default.outlineWidth,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
});
