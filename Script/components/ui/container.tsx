import { ThemedView, ThemedViewProps } from '@/components/themed-view';
import { Colors, Constants } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export type ContainerProps = {
    color?: 'accent' | 'background' | 'button' | 'container' | 'red' | 'green',
    invisible?: boolean,
  };

export function Container({ color = 'background', invisible = false, style = styles.default, children }: ThemedViewProps & ContainerProps) {
    if (invisible) {
        return (
            <ThemedView color={color} style={styles.invisible}>
                {children}
            </ThemedView>
        )
    }
    
    return (
        <ThemedView color='container' style={style}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
        margin: 10,
        borderRadius: Constants.default.borderRadius,
        outlineColor: Colors.default.border,
        outlineWidth: Constants.default.outlineWidth,
        flex: 1,
        gap: 15,
    },
    invisible: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
        flex: 1,
        gap: 15,
    }
});