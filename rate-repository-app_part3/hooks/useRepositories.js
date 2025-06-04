// hooks/useRepositories.js
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return { repositories, loading, error };
};

export default useRepositories;