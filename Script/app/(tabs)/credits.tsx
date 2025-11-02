import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { ScrollView } from 'react-native';

export default function CreditsScreen() {
    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Credits' backPath='home'></Header>
            <ThemedView color='background'>
            
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
        </ScrollView>
      );
}