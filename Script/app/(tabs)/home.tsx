import { ThemedImage } from '@/components/themed-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedButton } from '@/components/ui/themed-button';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Home' backPath='home'></Header>
            <ThemedView color='background'>
            
                <Container>
                    <ThemedImage style={styles.logoImage}/> 
                </Container>

                <Container>
                    <ThemedButton>
                        <IconSymbol name='sparkles'></IconSymbol>
                        <ThemedText>Generate ID</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <IconSymbol name='doc.text.magnifyingglass'></IconSymbol>
                        <ThemedText>View History</ThemedText>
                    </ThemedButton>
                    <ThemedButton>
                        <IconSymbol name='star'></IconSymbol>
                        <ThemedText>Credits</ThemedText>
                    </ThemedButton>
                </Container>
                
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    logoImage: { // TODO actually do the thing
        width: '100%',
        height: 200,
    },
});