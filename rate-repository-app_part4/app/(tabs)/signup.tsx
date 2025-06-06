// app/(tabs)/signup.tsx - 修复版本
import { Formik } from 'formik';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import useSignUp from '../../hooks/useSignUp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#24292e',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
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
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export default function SignUpScreen() {
  const [signUp, { loading }] = useSignUp();

  const onSubmit = async (values: any) => {
    try {
      await signUp({
        username: values.username,
        password: values.password,
      });
      Alert.alert('Success', 'Account created successfully!');
    } catch (e) {
      console.error('Sign up error:', e);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign Up</Text>

        <Formik
          initialValues={{ username: '', password: '', passwordConfirmation: '' }}
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
                autoComplete="username"
                textContentType="username"
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
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                passwordRules="minlength: 5; maxlength: 50;"
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.passwordConfirmation && errors.passwordConfirmation && styles.errorInput,
                ]}
                placeholder="Password confirmation"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
              )}

              <Pressable
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating account...' : 'Sign up'}
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}