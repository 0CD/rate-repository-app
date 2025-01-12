import { FlatList, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import Text from './Text';
import ReviewItem from './ReviewItem';
import { DELETE_REVIEW } from '../graphql/mutations';
import useUserReviews from '../hooks/useUserReviews';
import { ItemSeparator } from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const UserReviews = () => {
  const { reviews, loading, error, refetch } = useUserReviews();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleDelete = async (reviewId) => {
    await deleteReview({ variables: { id: reviewId } });
    refetch();
  };

  return (
    <View style={styles.container}>
      {loading && (
        <Text color='textSecondary' style={{ textAlign: 'center' }}>
          Loading...
        </Text>
      )}
      {error && (
        <Text color='textSecondary' style={{ textAlign: 'center' }}>
          Error: {error.message}
        </Text>
      )}
      {!loading && !error && (
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ReviewItem review={item} showActions={true} onDelete={() => handleDelete(item.id)} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default UserReviews;
