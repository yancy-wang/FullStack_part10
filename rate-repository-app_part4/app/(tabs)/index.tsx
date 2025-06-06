// app/(tabs)/index.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from '../../components/RepositoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
}