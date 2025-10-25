import { ThemedImage } from '@/components/themed-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ThemedButton } from '@/components/ui/themed-button';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <ThemedView color='background' style={{gap: 20}}>
            <Header title='Home'></Header>

            <ThemedImage/>

            <ThemedView color='accent' style={styles.buttonMenu}>
                <ThemedView color='accent'>
                    <ThemedButton>
                        <ThemedText>Generate ID</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <ThemedText>View History</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <ThemedText>Credits</ThemedText>
                    </ThemedButton>
                </ThemedView>
            </ThemedView>

        </ThemedView>
      );
}

const styles = StyleSheet.create({
    buttonMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      alignContent: 'center',
      justifyContent: 'center',
      outlineWidth: 2,
      outlineColor: '#000',
    },
  });