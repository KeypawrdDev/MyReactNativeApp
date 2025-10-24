import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const HooksDemo: React.FC = () => {
  // useState examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [users, setUsers] = useState<string[]>([]);

  // useEffect examples
  useEffect(() => {
    console.log('Component mounted or count changed:', count);
    return () => {
      console.log('Cleanup function called');
    };
  }, [count]);

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // useMemo example - expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]);

  // useCallback example - memoized function
  const addUser = useCallback(() => {
    if (name.trim()) {
      setUsers(prev => [...prev, name.trim()]);
      setName('');
    }
  }, [name]);

  const removeUser = useCallback((index: number) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Regular function (not memoized) for comparison
  const regularFunction = () => {
    Alert.alert('Regular Function', 'This function is recreated on every render');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Hooks Demo</Text>
      
      {/* useState Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>useState Examples</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.label}>Counter: {count}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCount(0)}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Add User:</Text>
          <TouchableOpacity style={styles.addButton} onPress={addUser}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* useMemo Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>useMemo Example</Text>
        <Text style={styles.label}>Expensive calculation result: {expensiveValue}</Text>
        <Text style={styles.note}>
          This value is only recalculated when count changes (check console for logs)
        </Text>
      </View>

      {/* useCallback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>useCallback vs Regular Function</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={addUser}>
            <Text style={styles.buttonText}>Memoized Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={regularFunction}>
            <Text style={styles.buttonText}>Regular Function</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.note}>
          Memoized functions are only recreated when dependencies change
        </Text>
      </View>

      {/* Users List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users List ({users.length})</Text>
        {users.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <Text style={styles.userText}>{user}</Text>
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removeUser(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* useEffect Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>useEffect Info</Text>
        <Text style={styles.note}>
          • First useEffect runs when count changes{'\n'}
          • Second useEffect runs only on mount/unmount{'\n'}
          • Check console for lifecycle logs
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
  counterContainer: {
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 6,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 5,
    borderRadius: 4,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default HooksDemo;
