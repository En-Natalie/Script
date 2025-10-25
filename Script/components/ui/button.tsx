{/* <Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { StyleSheet } from 'react-native';

export function Button() {


    return (
        <ThemedView color='buttonBackground' style={styles.default}>
            <ThemedText type='emphasis'>{"BBB"}</ThemedText>
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