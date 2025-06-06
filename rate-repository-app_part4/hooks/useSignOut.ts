import { useApolloClient } from '@apollo/client';
import AuthStorage from '../utils/authStorage';

const useSignOut = () => {
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      const authStorage = new AuthStorage();
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return signOut;
};

export default useSignOut;