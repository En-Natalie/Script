import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedButton } from '@/components/ui/themed-button';
import { Colors, Constants } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Image, ScrollView } from 'react-native';

/**
 * Screen that gives logged in in users options to generate id, view credits, view history, and log out.
 */
export default function HomeScreen() {
    const router = useRouter();

    const logoURL = require('@/assets/images/script-logo-small.png');
    const h = logoURL.height;
    const w = logoURL.width;
    const aspectRatio = w / h;

    /**
     * Image element showing logo
     */
    const logoImage = <Image
        style={[{
            borderWidth: Constants.default.outlineWidth,
            borderColor: Colors.default.border,
            borderRadius: Constants.default.borderRadius,
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
            aspectRatio: aspectRatio,
        }]}
        source={logoURL}
    />

    return (
        <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: Colors.default.background}}>
            <Header title='Home' backPath='/home'></Header>
            <ThemedView color='background'>

                <Container>
                    {logoImage}
                </Container>

                <Container>
                    <ThemedButton onPress={() => router.navigate('/input' as any)}>
                        <IconSymbol name='sparkles'></IconSymbol>
                        <ThemedText>Generate ID</ThemedText>
                    </ThemedButton>
                    <ThemedButton onPress={() => router.navigate('/history' as any)}>
                        <IconSymbol name='doc.text.magnifyingglass'></IconSymbol>
                        <ThemedText>View History</ThemedText>
                    </ThemedButton>
                    <ThemedButton onPress={() => router.navigate('/credits')}>
                        <IconSymbol name='star'></IconSymbol>
                        <ThemedText>Credits</ThemedText>
                    </ThemedButton>
                    <ThemedButton onPress={() => router.replace('/' as any)}>
                        <IconSymbol name='arrow.left'></IconSymbol>
                        <ThemedText>Log Out</ThemedText>
                    </ThemedButton>
                </Container>
                
            </ThemedView>
        </ScrollView>
    );
}