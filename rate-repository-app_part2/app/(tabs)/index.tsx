import { StyleSheet, View } from 'react-native';
import RepositoryList from '../../components/RepositoryList';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
}