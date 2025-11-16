import { StyleSheet, Text, type TextProps } from 'react-native';
import { Colors} from "@/constants/theme";

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'short' | 'emphasis' | 'error' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  const color = useThemeColor('text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'short' ? styles.short : undefined,
        type === 'emphasis' ? styles.emphasis : undefined,
        type === 'error' ? styles.error : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    short: {
        fontSize: 16,
        lineHeight: 16,
    },
    emphasis: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    error: {
        fontSize: 15,
        lineHeight: 20,
        color: Colors.default.error,
        // fontWeight: 'bold',
        // fontStyle: 'italic',
        // textAlign: 'center',
    },
  
    title: {
        fontSize: 32,
        fontWeight: 900,
        letterSpacing: 7,
        lineHeight: 32,

        color: 'white',

        textShadowColor: 'accent',
        textShadowRadius: 0,
        textShadowOffset: {height: 5, width: 0},

        // TODO the following is not what we want...hm
        // outlineColor: 'ff0000',
        // outlineStyle: 'solid',
        // outlineWidth: 10,
    },

    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
