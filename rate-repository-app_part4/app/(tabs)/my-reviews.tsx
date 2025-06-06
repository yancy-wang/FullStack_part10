// app/(tabs)/my-reviews.tsx - 完整修复版本
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import UserReviewItem from '../../components/UserReviewItem';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Review } from '../../types';

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
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
    lineHeight: 24,
  },
  debugContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default function MyReviewsScreen() {
  const { user, loading, error, refetch } = useCurrentUser(true);
  const [refreshing, setRefreshing] = React.useState(false);

  console.log('MyReviewsScreen - User data:', user);
  console.log('MyReviewsScreen - Loading:', loading);
  console.log('MyReviewsScreen - Error:', error);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.error('Refresh error:', e);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (loading && !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading your reviews...</Text>
      </View>
    );
  }

  if (error) {
    console.error('User query error:', error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#d73a49', textAlign: 'center' }}>
          Error loading reviews: {error.message}
        </Text>
        <Text 
          style={{ color: '#0366d6', marginTop: 10 }}
          onPress={onRefresh}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#d73a49', textAlign: 'center' }}>
          User not authenticated. Please sign in.
        </Text>
      </View>
    );
  }

  const reviews = user?.reviews?.edges?.map((edge: { node: Review }) => edge.node) || [];
  
  console.log('Reviews found:', reviews.length);
  console.log('Reviews data:', reviews);

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={[]}
          renderItem={() => null}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You haven&apos;t reviewed any repositories yet.{'\n\n'}
                Create your first review by going to the &ldquo;Create a review&rdquo; tab!
              </Text>
            </View>
          }
        />
        
        {/* Debug info - remove in production */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Debug Info:</Text>
            <Text style={styles.debugText}>User ID: {user?.id}</Text>
            <Text style={styles.debugText}>Username: {user?.username}</Text>
            <Text style={styles.debugText}>Reviews edges: {user?.reviews?.edges?.length || 0}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <UserReviewItem 
            review={item} 
            onDelete={onRefresh}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}