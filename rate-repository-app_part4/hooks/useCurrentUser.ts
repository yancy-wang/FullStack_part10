import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews: boolean = false) => {
  console.log('useCurrentUser called with includeReviews:', includeReviews);
  
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  console.log('useCurrentUser - Data:', data);
  console.log('useCurrentUser - Loading:', loading);
  console.log('useCurrentUser - Error:', error);

  return { 
    user: data?.me, 
    loading, 
    error, 
    refetch 
  };
};

export default useCurrentUser;