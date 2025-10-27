{/* <Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}

import { ThemedView } from '@/components/themed-view';
import { StyleSheet, ViewProps } from 'react-native';

export type ThemedButtonProps = {
    color?: 'button' | 'red' | 'green',
    square?: boolean
};

export function ThemedButton({ color = 'button', square = false, style = styles.default, children }: ViewProps & ThemedButtonProps) {
    if (square) {
        style = styles.square
    }
    
    return (
        <ThemedView color={color} style={style}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        padding: 5,
        borderRadius: 10,
        outlineColor: '#000',
        outlineWidth: 2,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    square: {
        padding: 5,
        borderRadius: 10,
        outlineColor: '#000',
        outlineWidth: 2,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: 10,
        flex: 1,
    }
});