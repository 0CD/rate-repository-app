import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositoryNodes = data ? data.repositories.edges.map((edge) => edge.node) : [];

  return { repositories: repositoryNodes, loading, error };
};

export default useRepositories;