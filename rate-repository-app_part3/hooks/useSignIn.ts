import { useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'expo-router';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

interface AuthenticateData {
  authenticate: {
    accessToken: string;
  };
}

interface AuthenticateCredentials {
  username: string;
  password: string;
}

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [mutate, result] = useMutation<AuthenticateData>(AUTHENTICATE);

  const signIn = async ({ username, password }: AuthenticateCredentials) => {
    try {
      const authStorage = new AuthStorage();
      
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
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  return [signIn, result] as const;
};

export default useSignIn;