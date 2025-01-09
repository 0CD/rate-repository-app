import { StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    flexGrow: 0,
    padding: 15,
  },
});

const AppBarTab = ({ label, link }) => {
  return (
    <Link to={link} style={styles.tab}>
      <Text fontWeight='bold' style={{ color: 'white' }}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
