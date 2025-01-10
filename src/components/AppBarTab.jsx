import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    flexGrow: 0,
    padding: 15,
  },
  text: {
    color: 'white',
  },
});

const AppBarTab = ({ children, to, onPress }) => {
  const content = (
    <Text fontWeight='bold' style={styles.text}>
      {children}
    </Text>
  );

  if (to) {
    return (
      <Link to={to} style={styles.tab}>
        {content}
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.tab}>
      {content}
    </Pressable>
  );
};

export default AppBarTab;
