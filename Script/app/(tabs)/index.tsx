import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/ui/header';
import { ThemedButton } from '@/components/ui/themed-button';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView color='background'>
      <Header title="Log In"></Header>

      <Container>
        <ThemedTextInput text="Username"></ThemedTextInput>
        <Container>
          <ThemedText>password</ThemedText>
        </Container>
        <ThemedButton>
          <ThemedText>Log In</ThemedText>
        </ThemedButton>
        
      </Container>

      <Container>
        <ThemedText type='emphasis'>Sign Up</ThemedText>
        <ThemedText>TODO do the same thing here</ThemedText>
      </Container>

      <ThemedView style={styles.stepContainer}>
        
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
