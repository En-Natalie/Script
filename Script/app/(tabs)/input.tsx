import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxInput } from '@/components/ui/image-box-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { ScrollView, StyleSheet } from 'react-native';

export default function CreditsScreen() {
    return (
        <ThemedView color='background'>
            <Header title='Input'></Header>
            
            <ScrollView>
                <ImageBoxInput></ImageBoxInput>
                <ImageBoxInput></ImageBoxInput>
            </ScrollView>

            {/* Button menu */}
            <ThemedView color='accent' style={styles.buttonMenu}>
                <ThemedView color='accent'>
                    <ThemedButton>
                        <ThemedText>Paste from Keyboard</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <ThemedText>Open Files</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <ThemedText>Gallary</ThemedText>
                    </ThemedButton>
                </ThemedView>
                <ThemedButton>
                    <ThemedText>Continue</ThemedText>
                </ThemedButton>
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
      position: 'absolute',
      bottom: 60, // TODO this is bad lmao
      width: '100%'
    },
  });