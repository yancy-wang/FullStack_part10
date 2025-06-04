// hooks/useCurrentUser.js
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

interface User {
  id: string;
  username: string;
}

interface CurrentUserData {
  me: User | null;
}

const useCurrentUser = () => {
  const { data, loading, error } = useQuery<CurrentUserData>(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return { 
    user: data?.me ?? null,
    loading,
    error
  };
};

export default useCurrentUser;