import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import useDeleteReview from '../hooks/useDeleteReview';
import { Review } from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewInfoContainer: {
    flex: 1,
  },
  repositoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#586069',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a49',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface UserReviewItemProps {
  review: Review & {
    repository: {
      id: string;
      fullName: string;
    };
  };
  onDelete?: () => void;
}

const UserReviewItem: React.FC<UserReviewItemProps> = ({ review, onDelete }) => {
  const router = useRouter();
  const [deleteReview] = useDeleteReview();
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const handleViewRepository = () => {
    router.push({
      pathname: '/(tabs)/repository/[id]',
      params: { id: review.repository.id }
    } as any);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview(review.id);
              if (onDelete) {
                onDelete();
              }
            } catch (e) {
              console.error('Delete review error:', e);
              Alert.alert('Error', 'Failed to delete review');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      
      <View style={styles.actionsContainer}>
        <Pressable
          style={[styles.actionButton, styles.viewButton]}
          onPress={handleViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDeleteReview}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserReviewItem;