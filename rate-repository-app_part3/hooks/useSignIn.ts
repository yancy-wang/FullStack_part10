// hooks/useSignIn.js
import { FetchResult, useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { AUTHENTICATE } from '../graphql/mutations';

interface AuthenticateResponse {
  authenticate: {
    accessToken: string;
  };
}

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  if (!authStorage) {
    throw new Error('AuthStorageContext not initialized');
  }
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [mutate, result] = useMutation<AuthenticateResponse>(AUTHENTICATE);

  const signIn = async ({ username, password }: { username: string; password: string }): Promise<FetchResult<AuthenticateResponse>> => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      router.replace('/');
    }

    return { data };
  };

  return [signIn, result] as const;
};

export default useSignIn;