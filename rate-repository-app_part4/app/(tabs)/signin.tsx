// app/(tabs)/signin.tsx
import { Formik } from 'formik';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: '#d73a49',
  },
  errorText: {
    color: '#d73a49',
    marginBottom: 10,
    fontSize: 14,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function SignInScreen() {
  const [signIn, { loading }] = useSignIn();

  const onSubmit = async (values: any) => {
    try {
      await signIn(values);
      Alert.alert('Success', 'Signed in successfully!');
    } catch (e) {
      console.error('Sign in error:', e);
      Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Sign In
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={[
                styles.input,
                touched.username && errors.username && styles.errorInput,
              ]}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.password && errors.password && styles.errorInput,
              ]}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Pressable
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={() => handleSubmit()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}