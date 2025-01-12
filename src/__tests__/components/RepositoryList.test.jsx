import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const mockNavigate = jest.fn();

      render(
        <RepositoryListContainer repositories={repositories.edges.map((edge) => edge.node)} navigate={mockNavigate} />
      );

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepository, secondRepository] = repositoryItems;

      expect(firstRepository).toHaveTextContent(/jaredpalmer\/formik/i);
      expect(firstRepository).toHaveTextContent(/Build forms in React, without the tears/i);
      expect(firstRepository).toHaveTextContent(/TypeScript/i);
      expect(firstRepository).toHaveTextContent(/1\.6k/i);
      expect(firstRepository).toHaveTextContent(/21\.9k/i);
      expect(firstRepository).toHaveTextContent(/88/i);
      expect(firstRepository).toHaveTextContent(/3/i);

      expect(secondRepository).toHaveTextContent(/async-library\/react-async/i);
      expect(secondRepository).toHaveTextContent(/Flexible promise-based React data loader/i);
      expect(secondRepository).toHaveTextContent(/JavaScript/i);
      expect(secondRepository).toHaveTextContent(/69/i);
      expect(secondRepository).toHaveTextContent(/1\.8k/i);
      expect(secondRepository).toHaveTextContent(/72/i);
      expect(secondRepository).toHaveTextContent(/3/i);
    });
  });
});
