import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../utils/apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}