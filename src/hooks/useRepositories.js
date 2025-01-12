import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const variables = {
      orderBy,
      orderDirection,
      searchKeyword,
      first,
      after: data.repositories.pageInfo.endCursor,
    };

    fetchMore({
      variables,
    });
  };

  const repositoryNodes = data ? data.repositories.edges.map((edge) => edge.node) : [];

  return { repositories: repositoryNodes, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;