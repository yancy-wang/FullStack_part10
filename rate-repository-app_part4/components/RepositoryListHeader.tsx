import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  pickerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
});

interface RepositoryListHeaderProps {
  selectedOrder: string;
  onOrderChange: (order: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const RepositoryListHeader: React.FC<RepositoryListHeaderProps> = ({
  selectedOrder,
  onOrderChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOrder}
          onValueChange={onOrderChange}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryListHeader;