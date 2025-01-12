import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
  text: {
    color: 'white',
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.appBarPressed,
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
    <Pressable onPress={onPress} style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
};

export default AppBarTab;
