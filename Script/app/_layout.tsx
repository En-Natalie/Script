import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="index"></Stack.Screen>  
        <Stack.Screen name="signup"></Stack.Screen>
        <Stack.Screen name="home"></Stack.Screen>
        <Stack.Screen name="credits"></Stack.Screen>  
        <Stack.Screen name="input"></Stack.Screen>  
        <Stack.Screen name="confirm"></Stack.Screen>  
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
