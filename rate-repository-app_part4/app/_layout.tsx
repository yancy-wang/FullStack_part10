import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import AuthStorage from '../utils/authStorage';
import createApolloClient from '../utils/apolloClient';

const authStorage = new AuthStorage();

export default function RootLayout() {
  const [apolloClient, setApolloClient] = useState<any>(null);

  useEffect(() => {
    const client = createApolloClient(authStorage);
    setApolloClient(client);
  }, []);

  if (!apolloClient) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}