import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface RepositoryListContainerProps {
  repositories: {
    edges: {
      node: Repository;
    }[];
  };
  onEndReach?: () => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const RepositoryListContainer: React.FC<RepositoryListContainerProps> = ({
  repositories,
  onEndReach,
  ListHeaderComponent,
}) => {
  const router = useRouter();

  const handleRepositoryPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/repository/[id]',
      params: { id }
    } as any);
  };

  const renderItem = ({ item }: { item: { node: Repository } }) => (
    <Pressable onPress={() => handleRepositoryPress(item.node.id)}>
      <RepositoryItem repository={item.node} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryListContainer;