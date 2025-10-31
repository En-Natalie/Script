import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  color?: 'accent' | 'background' | 'button' | 'container' | 'red' | 'green'
};

export function ThemedView({ color = 'background', style, children }: ThemedViewProps) {
  const backgroundColor = useThemeColor(color);
  
  return (
    <View
      style={[{ 
        backgroundColor,
        flex: 1,
        },
        style,
      ]}> 
      { children }
    </View>
  );
}

// backgroundColor === 'containerBackground' ? styles.container : undefined,
// backgroundColor === 'buttonBackground' ? styles.button : undefined,
// backgroundColor === 'background' ? styles.background : undefined,
// backgroundColor === 'accent' ? styles.accent : undefined,