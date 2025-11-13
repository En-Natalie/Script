import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { ScrollView } from 'react-native';

export default function CreditsScreen() {
    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header title='Credits' backPath='/home'></Header>
            <ThemedView color='background'>
            
                <Container>
                    <ThemedText type='emphasis'>Developed by Group 37</ThemedText>
                    <ThemedText type='short'>Amalia Aguilar</ThemedText>
                    <ThemedText type='short'>Brian Hoang</ThemedText>
                    <ThemedText type='short'>Natalie Nenachev</ThemedText>

                    <ThemedText>- - - - -</ThemedText>
            
                    <ThemedText type='emphasis'>For CS 1200.004</ThemedText>
                    <ThemedText type='emphasis'>Project Assignment 3</ThemedText>
            
                    <ThemedText>- - - - -</ThemedText>

                    <ThemedText type='emphasis'>Tools Used</ThemedText>
                    <ThemedText type='short'>Wireframe: Figma</ThemedText>
                    <ThemedText type='short'>Frontend: React Native</ThemedText>
                    <ThemedText type='short'>Backend: Node.js</ThemedText>
                    <ThemedText type='short'>Cloud Service: Cloudinary</ThemedText>
                    <ThemedText type='short'>Security Service: Qualysec</ThemedText>
                    <ThemedText type='short'>AI Generator: Open AI</ThemedText>
                </Container>
            </ThemedView>
        </ScrollView>
      );
}