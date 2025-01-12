import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/signup' element={<SignUp />} exact />
        <Route path='/repository/:id' element={<SingleRepository />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route path='/user-reviews' element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
