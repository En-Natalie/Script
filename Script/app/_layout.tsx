import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="credits" options={{ headerShown: false }} />
        <Stack.Screen name="input" options={{headerShown: false }} />
        <Stack.Screen name="confirm" options={{headerShown: false}} />
        <Stack.Screen name="results" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}


/*

bleh. probably better practice, but i don't care

<Stack.Screen
            name="home"
            // options={ { headerTitle: 'Home' },  }>
            options={{
                headerTitle: () => <ThemedText type={'title'}> hello </ThemedText>,
                headerLeft: () =>
                    <ThemedButton style={{maxWidth: 45}}>
                        <IconSymbol name={'arrow.left'}></IconSymbol>
                    </ThemedButton>,
                headerStyle: {
                    backgroundColor: Colors.default.accent,
                    // height: 120,

                }
            }}
          >
        </Stack.Screen>

 */