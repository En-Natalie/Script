import { ThemedImage } from '@/components/themed-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedButton } from '@/components/ui/themed-button';
import { ScrollView, StyleSheet } from 'react-native';
import { Constants, Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Home' backPath='/home'></Header>
            <ThemedView color='background'>

                <Container>
                    <ThemedImage url={'asdf'} height={100} width={100} />
                </Container>

                <Container>
                    <ThemedButton onPress={() => router.navigate('/input')}>
                        <IconSymbol name='sparkles'></IconSymbol>
                        <ThemedText>Generate ID</ThemedText>
                    </ThemedButton>
                    <ThemedButton onPress={() => router.navigate('/history')}>
                        <IconSymbol name='doc.text.magnifyingglass'></IconSymbol>
                        <ThemedText>View History</ThemedText>
                    </ThemedButton>
                    <ThemedButton onPress={() => router.navigate('/credits')}>
                        <IconSymbol name='star'></IconSymbol>
                        <ThemedText>Credits</ThemedText>
                    </ThemedButton>
                </Container>
                
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backLink: {
        padding: 5,
        borderRadius: Constants.default.borderRadius,
        outlineColor: Colors.default.border,
        outlineWidth: Constants.default.outlineWidth,
        backgroundColor: Colors.default.button,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    }
});