import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { Review } from '../types';

const useRepository = (id: string, first: number = 5) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges?.map((edge: { node: Review }) => edge.node) || [];

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first,
      },
    });
  };

  return {
    repository,
    reviews,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;