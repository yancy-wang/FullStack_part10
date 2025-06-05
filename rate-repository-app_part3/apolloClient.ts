// utils/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './utils/authStorage';

const httpLink = createHttpLink({
  uri: Constants.expoConfig?.extra?.apolloUri || 'http://localhost:4000',
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const authStorage = new AuthStorage();
    const accessToken = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  } catch (e) {
    console.log('Auth error:', e);
    return {
      headers,
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;