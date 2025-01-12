import { StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from './RepositoryList';
import theme from '../theme';
import ReviewItem from './ReviewItem';
import { Text } from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
  },
  username: {
    marginBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
  },
  reviewText: {
    color: theme.colors.textPrimary,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id, 4);

  if (loading) {
    return null;
  }

  const reviews = repository.reviews ? repository.reviews.edges.map((edge) => edge.node) : [];

  const handleEndReach = () => {
    fetchMore();
    // console.log('fetching more');
  };

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} showGithubLink={true} />
          <ItemSeparator />
        </>
      )}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
