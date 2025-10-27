import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const AsyncDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users with async/await
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts with Promise chains
  const fetchPosts = () => {
    setLoading(true);
    setError(null);
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch both users and posts
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both requests in parallel
      const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
      ]);
      
      if (!usersResponse.ok || !postsResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const [usersData, postsData] = await Promise.all([
        usersResponse.json(),
        postsResponse.json()
      ]);
      
      setUsers(usersData);
      setPosts(postsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  }, []);

  // Load data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Retry function
  const retry = () => {
    setError(null);
    fetchAllData();
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Async Operations Demo</Text>
      
      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchUsers}>
          <Text style={styles.buttonText}>Fetch Users (async/await)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={fetchPosts}>
          <Text style={styles.buttonText}>Fetch Posts (Promises)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={fetchAllData}>
          <Text style={styles.buttonText}>Fetch All (Parallel)</Text>
        </TouchableOpacity>
      </View>

      {/* Users Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users ({users.length})</Text>
        {users.map(user => (
          <View key={user.id} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{user.name}</Text>
            <Text style={styles.itemSubtitle}>{user.email}</Text>
            <Text style={styles.itemText}>{user.phone}</Text>
          </View>
        ))}
      </View>

      {/* Posts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posts ({posts.length})</Text>
        {posts.slice(0, 5).map(post => (
          <View key={post.id} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{post.title}</Text>
            <Text style={styles.itemText}>{post.body.substring(0, 100)}...</Text>
          </View>
        ))}
        {posts.length > 5 && (
          <Text style={styles.moreText}>... and {posts.length - 5} more posts</Text>
        )}
      </View>

      {/* Async Patterns Explanation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Async Patterns</Text>
        <Text style={styles.note}>
          • async/await: Modern, readable async code{'\n'}
          • Promises: Traditional promise chains{'\n'}
          • Promise.all: Parallel requests{'\n'}
          • Error handling: try/catch and .catch(){'\n'}
          • Loading states: Show spinners during requests{'\n'}
          • Pull to refresh: RefreshControl component
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 14,
    color: '#C62828',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#C62828',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
    borderRadius: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  moreText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  note: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AsyncDemo;