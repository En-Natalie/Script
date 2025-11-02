import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'emphasis' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  const color = useThemeColor('text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'emphasis' ? styles.emphasis : undefined,
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
  emphasis: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
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
