{/* <Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}

import { ThemedView } from '@/components/themed-view';
import { Colors, Constants } from '@/constants/theme';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';

export type ThemedButtonProps = {
    color?: 'button' | 'red' | 'green',
    onPress?: () => void,
};

export function ThemedButton({ color = 'button', onPress, style = styles.default, children }: ViewProps & ThemedButtonProps) {
    return (
        <ThemedView color={color} style={style} >
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress} >
                {children}
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        padding: 5,
        borderRadius: Constants.default.borderRadius,
        outlineColor: Colors.default.border,
        outlineWidth: Constants.default.outlineWidth,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    touchableOpacity: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        gap: 5,
    }
});