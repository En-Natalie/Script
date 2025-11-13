import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors, Constants } from '@/constants/theme';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/ui/header';
import {Text} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {ThemedButton} from "@/components/ui/themed-button";
import {IconSymbol} from "@/components/ui/icon-symbol";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const getHeader = () => {
      return <Header backPath={"/"}></Header>
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="credits" options={{ headerShown: false }} />
        <Stack.Screen name="input" options={{headerShown: false }} />
        <Stack.Screen name="confirm" options={{headerShown: false}} />
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