import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

interface RepositoriesData {
  repositories: {
    edges: { node: Repository; }[];
  };
}

const useRepositories = () => {
  const { data, error, loading } = useQuery<RepositoriesData>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return { repositories, loading, error };
};

export default useRepositories;