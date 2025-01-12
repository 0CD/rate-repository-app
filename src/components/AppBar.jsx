import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';

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
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();
  const signOut = useSignOut();

  const isAuthenticated = data?.me;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to='/'>Repositories</AppBarTab>
        {isAuthenticated ? (
          <>
            <AppBarTab to='/user-reviews'>My reviews</AppBarTab>
            <AppBarTab to='/create-review'>Create a review</AppBarTab>
            <AppBarTab onPress={handleSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to='/signup'>Sign up</AppBarTab>
            <AppBarTab to='/signin'>Sign in</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
