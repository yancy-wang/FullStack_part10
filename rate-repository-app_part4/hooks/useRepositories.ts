import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { OrderBy, OrderDirection, Repository } from '../types';

interface UseRepositoriesVariables {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
  searchKeyword?: string;
  first?: number;
  after?: string;
}

const useRepositories = (variables: UseRepositoriesVariables = {}) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: variables.orderBy || 'CREATED_AT',
      orderDirection: variables.orderDirection || 'DESC',
      searchKeyword: variables.searchKeyword || '',
      first: variables.first || 8,
      after: variables.after,
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data?.repositories?.edges?.map((edge: { node: Repository }) => edge.node) || [];

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;