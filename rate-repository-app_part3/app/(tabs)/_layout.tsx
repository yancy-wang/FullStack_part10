import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import theme from '@/constants/theme';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSignOut from '@/hooks/useSignOut';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const { user, error } = useCurrentUser();
  const signOut = useSignOut();

  if (error) {
    console.error('Error fetching current user:', error);
  }

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
        <Tabs.Screen
          name="signout"
          options={{
            title: 'Sign out',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.badge.minus" color={color} />,
            headerTitle: 'Sign out',
            tabBarButton: (props: any) => (
              <Pressable
                {...props}
                onPress={handleSignOut}
                style={props.style}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleSignOut();
            },
          }}
        />
      ) : (
        <Tabs.Screen
          name="signin"
          options={{
            title: 'Sign in',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
            headerTitle: 'Sign in',
          }}
        />
      )}
    </Tabs>
  );
}