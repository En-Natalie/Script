import { ThemedImage } from '@/components/themed-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ImageBoxInput } from '@/components/ui/image-box-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { ScrollView, StyleSheet } from 'react-native';

export default function InputScreen() {
    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Input' backPath='home'></Header>
            <ThemedView color='background'>
            
                {/* images */}
                <ImageBoxInput>
                       <ThemedImage/>
                </ImageBoxInput>
                <ImageBoxInput>
                    <ThemedImage/>
                </ImageBoxInput>

            </ThemedView>

            {/* Button menu */}
            <ThemedView color='accent' style={styles.buttonMenu}>

            <ThemedView color='accent' style={styles.verticalButtonMenu}>
                <ThemedButton>
                    <ThemedText>Paste from Keyboard</ThemedText>
                </ThemedButton>
                <ThemedButton>
                    <ThemedText>Open Files</ThemedText>
                </ThemedButton>
                <ThemedButton>
                    <ThemedText>Gallery</ThemedText>
                </ThemedButton>
            </ThemedView>

            <ThemedView color='accent'>
                <ThemedButton>
                    <ThemedText>Continue</ThemedText>
                </ThemedButton>
            </ThemedView>

            </ThemedView>
        </ScrollView>
    )
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
        padding: 10,
        // position: 'absolute',
        // bottom: 60, // TODO this is bad lmao
        // width: '100%'
    },
    verticalButtonMenu: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        alignContent: 'center',
        justifyContent: 'center',
    }
});