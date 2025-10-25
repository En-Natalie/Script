{/* <Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}

import { ThemedView } from '@/components/themed-view';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

export type ThemedButtonProps = {
    color?: 'button' | 'red' | 'green'
};

export function ThemedButton({ color = 'button', children }: PropsWithChildren & ThemedButtonProps) {
    return (
        <ThemedView color={color} style={styles.default}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        margin: 10,
        padding: 5,
        borderRadius: 10,
        outlineColor: '#000',
        outlineWidth: 2,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
});