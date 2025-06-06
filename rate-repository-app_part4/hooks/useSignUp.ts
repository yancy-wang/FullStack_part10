import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

interface SignUpInput {
  username: string;
  password: string;
}

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }: SignUpInput) => {
    const { data } = await mutate({
      variables: {
        user: { username, password },
      },
    });

    if (data?.createUser) {
      await signIn({ username, password });
    }

    return { data };
  };

  return [signUp, result] as const;
};

export default useSignUp;