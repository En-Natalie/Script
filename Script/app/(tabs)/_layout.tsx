import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={{
              tabBarActiveTintColor: Colors.default.tint,
              headerShown: false,
              tabBarButton: HapticTab,
          }}>
          <Tabs.Screen
              name="input"
              options={{
                  title: 'Input',
                  tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
              }}
          />
          <Tabs.Screen
              name="confirm"
              options={{
                  title: 'Confirm',
                  tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
              }}
          />
      </Tabs>
  );
}
