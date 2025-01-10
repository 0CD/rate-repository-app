import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();

  const isAuthenticated = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to='/'>Repositories</AppBarTab>
        {isAuthenticated ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to='/signin'>Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
