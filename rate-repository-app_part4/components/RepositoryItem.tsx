// components/RepositoryItem.tsx
import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { formatNumber } from '../utils/formatNumber';
import { Repository } from '../types';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#24292e',
  },
  descriptionText: {
    fontSize: 14,
    color: '#586069',
    marginBottom: 10,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    marginBottom: 10,
  },
  languageText: {
    color: 'white',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#24292e',
  },
  statLabel: {
    fontSize: 12,
    color: '#586069',
    marginTop: 2,
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  githubButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface RepositoryItemProps {
  repository: Repository;
  showGitHubButton?: boolean;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ 
  repository, 
  showGitHubButton = false 
}) => {
  const handleOpenInGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{repository.fullName}</Text>
          <Text style={styles.descriptionText}>{repository.description}</Text>
          {repository.language && (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{repository.language}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(repository.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(repository.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{repository.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{repository.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenInGitHub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;