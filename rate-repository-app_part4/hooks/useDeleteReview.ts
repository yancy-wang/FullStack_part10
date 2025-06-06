import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id: string) => {
    const { data } = await mutate({
      variables: { deleteReviewId: id },
    });

    return { data };
  };

  return [deleteReview, result] as const;
};

export default useDeleteReview;