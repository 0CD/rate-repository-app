import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reviewItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d73a4a',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
});

const ReviewItem = ({ review, showActions = false, onDelete }) => {
  const navigate = useNavigate();

  const handleViewRepository = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewItem}>
        <View style={styles.header}>
          <View style={styles.rating}>
            <Text fontSize='heading' fontWeight='bold' style={styles.ratingText}>
              {review.rating}
            </Text>
          </View>
          <View style={styles.info}>
            <Text fontSize='subheading' fontWeight='bold' style={styles.username}>
              {review.user.username}
            </Text>
            <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
      {showActions && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleViewRepository}>
            <Text style={{ color: 'white' }} fontWeight='bold'>
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDeleteReview}>
            <Text style={{ color: 'white' }} fontWeight='bold'>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
