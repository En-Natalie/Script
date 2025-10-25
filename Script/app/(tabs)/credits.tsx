import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Header } from '@/components/ui/header';
import { Fonts } from '@/constants/theme';
import { Container } from '@/components/ui/container';

export default function CreditsScreen() {
    return (
        <ThemedView color='background'>
            <Header title='Credits'></Header>
            <Container>
                <ThemedText type='emphasis'>Developed by Group 37</ThemedText>
                <ThemedText>Amalia Aguilar</ThemedText>
                <ThemedText>Brian Hoang</ThemedText>
                <ThemedText>Natalie Nenachev</ThemedText>
                <ThemedText></ThemedText>
        
                <ThemedText type='emphasis'>For CS 1200.004</ThemedText>
                <ThemedText type='emphasis'>Project Assignment 3</ThemedText>
                <ThemedText></ThemedText>
        
                <ThemedText type='emphasis'>Tools Used</ThemedText>
                <ThemedText>Wireframe: Figma</ThemedText>
                <ThemedText>Frontend: React Native</ThemedText>
                <ThemedText>Backend: Node.js</ThemedText>
                <ThemedText>Cloud Service: Cloudinary</ThemedText>
                <ThemedText>Security Service: Qualysec</ThemedText>
                <ThemedText>AI Generator: Open AI</ThemedText>
            </Container>
        </ThemedView>
      );
}