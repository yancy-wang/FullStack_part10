import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import { CREATE_REVIEW } from '../graphql/mutations';

interface CreateReviewInput {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text?: string;
}

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const router = useRouter();

  const createReview = async (review: CreateReviewInput) => {
    const { data } = await mutate({
      variables: { review },
    });

    if (data?.createReview) {
      const repositoryId = data.createReview.repositoryId;
      router.push({
        pathname: '/(tabs)/repository/[id]',
        params: { id: repositoryId }
      } as any);
    }

    return { data };
  };

  return [createReview, result] as const;
};

export default useCreateReview;