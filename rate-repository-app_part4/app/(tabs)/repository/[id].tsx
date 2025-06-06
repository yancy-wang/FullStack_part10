import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import RepositoryItem from '../../../components/RepositoryItem';
import ReviewItem from '../../../components/ReviewItem';
import useRepository from '../../../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default function SingleRepositoryScreen() {
  const { id } = useLocalSearchParams();
  const { repository, reviews, loading, error, fetchMore } = useRepository(
    id as string,
    5
  );

  if (loading && !repository) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const RepositoryInfo = () => (
    <RepositoryItem repository={repository} showGitHubButton={true} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={RepositoryInfo}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}