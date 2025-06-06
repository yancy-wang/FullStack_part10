import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search repositories..."
      value={searchQuery}
      onChangeText={onSearchChange}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

export default SearchBar;