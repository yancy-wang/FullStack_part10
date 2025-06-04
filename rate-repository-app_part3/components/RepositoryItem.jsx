// components/RepositoryItem.jsx
import { View, StyleSheet, Image } from 'react-native';
import Text from './ui/ThemedText'
import theme from '../constants/theme';
import { formatNumber } from '../constants/utils';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
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
    marginBottom: 5,
  },
  descriptionText: {
    marginBottom: 10,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    marginBottom: 10,
  },
  languageText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    marginTop: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.nameText}>
            {repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.descriptionText}>
            {repository.description}
          </Text>
          {repository.language && (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{repository.language}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatNumber(repository.stargazersCount)}</Text>
          <Text color="textSecondary" style={styles.statText}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatNumber(repository.forksCount)}</Text>
          <Text color="textSecondary" style={styles.statText}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.reviewCount}</Text>
          <Text color="textSecondary" style={styles.statText}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
          <Text color="textSecondary" style={styles.statText}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;