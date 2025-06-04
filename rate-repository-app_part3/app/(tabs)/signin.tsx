// app/(tabs)/signin.tsx
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../components/Button';
import FormikTextInput from '../../components/FormikTextInput';
import theme from '../../constants/theme';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    padding: 20,
  },
  formContainer: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput 
        name="username" 
        placeholder="Username"
        autoCapitalize="none"
      />
      <FormikTextInput 
        name="password" 
        placeholder="Password"
        secureTextEntry
      />
      <Button onPress={onSubmit}>Sign in</Button>
    </View>
  );
};

export default function SignInScreen() {
  const [signIn] = useSignIn();

  const onSubmit = async (values: { username: string; password: string }) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}