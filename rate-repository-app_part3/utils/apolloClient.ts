import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './authStorage';

const httpLink = createHttpLink({
  uri: Constants.expoConfig?.extra?.apolloUri || 'http://localhost:4000',
});

const globalAuthStorage = new AuthStorage();

const authLink = setContext(async (_, { headers }) => {
  try {
    const accessToken = await globalAuthStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  } catch (e) {
    console.log('Error getting access token:', e);
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