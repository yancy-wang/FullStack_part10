// app/(tabs)/_layout.tsx
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import theme from '@/constants/theme';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSignOut from '@/hooks/useSignOut';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { user } = useCurrentUser();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

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
      
      {user ? (
        <>
          <Tabs.Screen
            name="create-review"
            options={{
              title: 'Create a review',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle" color={color} />,
              headerTitle: 'Create a review',
            }}
          />
          <Tabs.Screen
            name="my-reviews"
            options={{
              title: 'My reviews',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
              headerTitle: 'My reviews',
            }}
          />
          <Tabs.Screen
            name="signout"
            options={{
              title: 'Sign out',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.badge.minus" color={color} />,
              headerTitle: 'Sign out',
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleSignOut();
              },
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="signin"
            options={{
              title: 'Sign in',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
              headerTitle: 'Sign in',
            }}
          />
          <Tabs.Screen
            name="signup"
            options={{
              title: 'Sign up',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.badge.plus" color={color} />,
              headerTitle: 'Sign up',
            }}
          />
        </>
      )}
      
      <Tabs.Screen
        name="repository"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}