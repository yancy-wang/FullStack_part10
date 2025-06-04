// app/(tabs)/_layout.tsx
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import theme from '@/constants/theme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: theme.colors.appBarBackground,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.appBarBackground,
        },
        headerTintColor: 'white',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Repositories',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerTitle: 'Repositories',
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: 'Sign in',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          headerTitle: 'Sign in',
        }}
      />
    </Tabs>
  );
}