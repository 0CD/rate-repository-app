import { View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  reviewInput: {
    height: 100,
    paddingTop: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        rating: parseInt(values.rating),
      });
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && styles.errorInput]}
          placeholder="Repository owner's username"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && styles.errorInput]}
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formik.touched.rating && formik.errors.rating && styles.errorInput]}
          placeholder='Rating (0-100)'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          keyboardType='numeric'
        />
        {formik.touched.rating && formik.errors.rating && <Text style={styles.errorText}>{formik.errors.rating}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.reviewInput, formik.touched.text && formik.errors.text && styles.errorInput]}
          placeholder='Review'
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
          multiline
        />
        {formik.touched.text && formik.errors.text && <Text style={styles.errorText}>{formik.errors.text}</Text>}
      </View>

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }} fontWeight='bold'>
          Create Review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: { review: values },
      });

      if (data?.createReview) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      const message = e.graphQLErrors?.[0]?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
