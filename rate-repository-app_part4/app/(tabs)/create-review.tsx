import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import CreateReviewForm from '../../components/CreateReviewForm';
import useCreateReview from '../../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

export default function CreateReviewScreen() {
  const [createReview, { loading }] = useCreateReview();

  const onSubmit = async (values: any) => {
    try {
      await createReview({
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: Number(values.rating),
        text: values.text,
      });
    } catch (e) {
      console.error('Create review error:', e);
      Alert.alert('Error', 'Failed to create review');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CreateReviewForm onSubmit={onSubmit} loading={loading} />
      </ScrollView>
    </View>
  );
}