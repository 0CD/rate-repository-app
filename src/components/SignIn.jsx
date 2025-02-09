import { View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 15,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formik.touched.username && formik.errors.username && styles.errorInput]}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formik.touched.password && formik.errors.password && styles.errorInput]}
          secureTextEntry
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }} fontWeight='bold'>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { authenticate } = await signIn({ username, password });
      if (authenticate) {
        navigate('/');
      }
    } catch (e) {
      const message = e.graphQLErrors?.[0]?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
