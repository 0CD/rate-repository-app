import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsItem: {
    alignItems: 'center',
  },
});

const thousandToK = (num) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight='bold' fontSize='subheading' style={{ marginBottom: 4 }}>
            {item.fullName}
          </Text>
          <Text color='textSecondary' style={{ marginBottom: 4 }}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <Text fontWeight='bold' style={{ marginBottom: 2 }}>
            {thousandToK(item.stargazersCount)}
          </Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight='bold' style={{ marginBottom: 2 }}>
            {thousandToK(item.forksCount)}
          </Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight='bold' style={{ marginBottom: 2 }}>
            {thousandToK(item.reviewCount)}
          </Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight='bold' style={{ marginBottom: 2 }}>
            {thousandToK(item.ratingAverage)}
          </Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
