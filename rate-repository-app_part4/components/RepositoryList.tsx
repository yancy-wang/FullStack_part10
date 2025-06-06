import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import { OrderBy, OrderDirection } from '../types';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const RepositoryList: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const router = useRouter();

  const getOrderVariables = (order: string) => {
    switch (order) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE' as OrderBy, orderDirection: 'DESC' as OrderDirection };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE' as OrderBy, orderDirection: 'ASC' as OrderDirection };
      default:
        return { orderBy: 'CREATED_AT' as OrderBy, orderDirection: 'DESC' as OrderDirection };
    }
  };

  const orderVariables = getOrderVariables(selectedOrder);
  const variables = {
    ...orderVariables,
    searchKeyword: debouncedSearchQuery,
  };

  const { repositories, loading, error, fetchMore } = useRepositories(variables);

  const handleRepositoryPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/repository/[id]',
      params: { id }
    } as any);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleRepositoryPress(item.id)}>
      <RepositoryItem repository={item} />
    </Pressable>
  );

  const renderHeader = () => (
    <RepositoryListHeader
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );

  if (loading && repositories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading repositories...</Text>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryList;