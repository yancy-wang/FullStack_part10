// components/CreateReviewForm.tsx
import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

interface CreateReviewFormProps {
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.ownerName && errors.ownerName && styles.errorInput,
            ]}
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName && styles.errorInput,
            ]}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.rating && errors.rating && styles.errorInput,
            ]}
            placeholder="Rating between 0 and 100"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Review"
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            multiline
            textAlignVertical="top"
          />

          <Pressable
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={() => handleSubmit()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating review...' : 'Create a review'}
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReviewForm;