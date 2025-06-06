import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { format } from 'date-fns';
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
  username: {
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
  },
});

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;