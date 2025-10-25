import { View, type ViewProps } from 'react-native';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  color: 'accent' | 'background' | 'buttonBackground' | 'containerBackground'
};

export function ThemedView({ color, style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(color);
  

  return (
    <View
      style={[
        { backgroundColor },
        // backgroundColor === 'containerBackground' ? styles.container : undefined,
        // backgroundColor === 'buttonBackground' ? styles.button : undefined,
        // backgroundColor === 'background' ? styles.background : undefined,
        // backgroundColor === 'accent' ? styles.accent : undefined,
        style,
      ]}
      {...otherProps}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
    
//   },
//   background: {
//     backgroundColor: 'accent',
//     padding: 100,
//   },
//   accent: {
//     backgroundColor: 'accent',
//     padding: 20,
//     margin: 10,
//   },
//   button: {
//     backgroundColor: 'buttonBackground',
//     padding: 20,
//     margin: 10,
//   }
// });
