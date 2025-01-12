import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Menu, Button, Provider } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sortButton: {
    backgroundColor: '#f6f8fa',
    borderWidth: 1,
    borderColor: '#d1d5da',
    borderRadius: 4,
  },
  sortButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  searchBar: {
    flex: 1,
    height: 42,
    backgroundColor: '#f6f8fa',
    borderColor: '#d1d5da',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const SortingMenu = ({ onValueChange }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode='outlined'
            style={styles.sortButton}
            labelStyle={styles.sortButtonText}
            icon='sort'
            onPress={openMenu}
          >
            Sort
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            onValueChange('latest');
            closeMenu();
          }}
          title='Latest repositories'
        />
        <Menu.Item
          onPress={() => {
            onValueChange('highest');
            closeMenu();
          }}
          title='Highest rated repositories'
        />
        <Menu.Item
          onPress={() => {
            onValueChange('lowest');
            closeMenu();
          }}
          title='Lowest rated repositories'
        />
      </Menu>
    </View>
  );
};

const RepositoryListHeader = ({ searchQuery, onSearchChange, onSortChange }) => (
  <View style={styles.menuContainer}>
    <TextInput
      style={styles.searchBar}
      placeholder='Search repositories'
      value={searchQuery}
      onChangeText={onSearchChange}
    />
    <SortingMenu onValueChange={onSortChange} />
  </View>
);

export const RepositoryListContainer = ({ repositories, onEndReach, navigate }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const getSortingParams = (value) => {
    switch (value) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { repositories, loading, error, fetchMore } = useRepositories({
    first: 8,
    ...getSortingParams(sortBy),
    searchKeyword: debouncedSearch,
  });

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleEndReach = () => {
    fetchMore();
    // console.log('fetching more');
  };

  return (
    <Provider>
      <RepositoryListHeader searchQuery={searchQuery} onSearchChange={handleSearch} onSortChange={handleSort} />
      {loading && (
        <Text color='textSecondary' style={{ textAlign: 'center' }}>
          Loading...
        </Text>
      )}
      {error && (
        <Text color='textSecondary' style={{ textAlign: 'center' }}>
          Error: {error.message}
        </Text>
      )}
      {!loading && !error && (
        <RepositoryListContainer repositories={repositories} onEndReach={handleEndReach} navigate={navigate} />
      )}
    </Provider>
  );
};

export default RepositoryList;
