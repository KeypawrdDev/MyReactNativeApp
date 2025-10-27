import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

const ES6SyntaxDemo: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25, city: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, city: 'Chicago' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', age: '', city: '' });

  // 1. Arrow Functions
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        id: Date.now(),
        ...newUser, // Spread operator
        age: parseInt(newUser.age, 10) || 0,
      };
      setUsers(prev => [...prev, user]); // Spread in array
      setNewUser({ name: '', email: '', age: '', city: '' });
    }
  };

  // 2. Destructuring
  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // 3. Template Literals
  const getUserInfo = (user: typeof users[0]) => {
    return `${user.name} (${user.age}) - ${user.email}`;
  };

  // 4. Array Methods (map, filter, reduce)
  const getStats = () => {
    const totalUsers = users.length;
    const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers;
    const cities = [...new Set(users.map(user => user.city))]; // Set for unique values
    
    return { totalUsers, averageAge, cities };
  };

  // 5. Object Methods
  const getUsersByCity = () => {
    return users.reduce((acc, user) => {
      const { city, ...userData } = user; // Destructuring
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(userData);
      return acc;
    }, {} as Record<string, any[]>);
  };

  // 6. Default Parameters
  const greetUser = (name: string, greeting: string = 'Hello') => {
    return `${greeting}, ${name}!`;
  };

  // 7. Rest Parameters
  const sumNumbers = (...numbers: number[]) => {
    return numbers.reduce((sum, num) => sum + num, 0);
  };

  // 8. Optional Chaining and Nullish Coalescing
  const getFirstUser = () => {
    const firstUser = users[0];
    return firstUser?.name ?? 'No users found';
  };

  const stats = getStats();
  const usersByCity = getUsersByCity();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ES6+ Syntax Demo</Text>

      {/* 1. Arrow Functions & Spread Operator */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Arrow Functions & Spread Operator</Text>
        <Text style={styles.note}>
          • Arrow functions: const func = () ={'>'} {} instead of function func() {} {'\n'}
          • Spread operator: ...array or ...object to copy/merge {'\n'}
          • Used in: handleAddUser, setUsers with spread
        </Text>
      </View>

      {/* 2. Destructuring */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Destructuring</Text>
        <Text style={styles.note}>
          • Object destructuring: const {'{'} name, email {'}'} = user {'\n'}
          • Array destructuring: const [first, second] = array {'\n'}
          • Used in: getUsersByCity function
        </Text>
      </View>

      {/* 3. Template Literals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Template Literals</Text>
        <Text style={styles.note}>
          • Backticks: `Hello ${'{'}name{'}'}` instead of 'Hello ' + name {'\n'}
          • Multi-line strings {'\n'}
          • Used in: getUserInfo function
        </Text>
      </View>

      {/* 4. Array Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Array Methods (map, filter, reduce)</Text>
        <Text style={styles.note}>
          • map: Transform each element {'\n'}
          • filter: Select elements based on condition {'\n'}
          • reduce: Accumulate values {'\n'}
          • Used in: getStats function
        </Text>
      </View>

      {/* 5. Default Parameters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Default Parameters</Text>
        <Text style={styles.note}>
          • Function parameters with default values {'\n'}
          • Used in: greetUser function
        </Text>
      </View>

      {/* 6. Rest Parameters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Rest Parameters</Text>
        <Text style={styles.note}>
          • ...args collects remaining parameters {'\n'}
          • Used in: sumNumbers function
        </Text>
      </View>

      {/* 7. Optional Chaining & Nullish Coalescing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Optional Chaining & Nullish Coalescing</Text>
        <Text style={styles.note}>
          • ?. safely access nested properties {'\n'}
          • ?? provides fallback for null/undefined {'\n'}
          • Used in: getFirstUser function
        </Text>
      </View>

      {/* Interactive Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Examples</Text>
        
        {/* Add User Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={newUser.name}
            onChangeText={(text) => setNewUser(prev => ({ ...prev, name: text }))}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={newUser.email}
            onChangeText={(text) => setNewUser(prev => ({ ...prev, email: text }))}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={newUser.age}
            onChangeText={(text) => setNewUser(prev => ({ ...prev, age: text }))}
            placeholder="Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={newUser.city}
            onChangeText={(text) => setNewUser(prev => ({ ...prev, city: text }))}
            placeholder="City"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <Text style={styles.statsText}>Total Users: {stats.totalUsers}</Text>
          <Text style={styles.statsText}>Average Age: {stats.averageAge.toFixed(1)}</Text>
          <Text style={styles.statsText}>Cities: {stats.cities.join(', ')}</Text>
        </View>

        {/* Users List */}
        <View style={styles.usersContainer}>
          <Text style={styles.usersTitle}>Users List</Text>
          {users.map(user => (
            <View key={user.id} style={styles.userItem}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userInfo}>{getUserInfo(user)}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(user.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Users by City */}
        <View style={styles.cityContainer}>
          <Text style={styles.cityTitle}>Users by City</Text>
          {Object.entries(usersByCity).map(([city, cityUsers]) => (
            <View key={city} style={styles.cityItem}>
              <Text style={styles.cityName}>{city}</Text>
              <Text style={styles.cityCount}>{cityUsers.length} users</Text>
            </View>
          ))}
        </View>

        {/* Function Examples */}
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Function Examples</Text>
          
          <TouchableOpacity 
            style={styles.exampleButton}
            onPress={() => Alert.alert('Greeting', greetUser('Alice'))}
          >
            <Text style={styles.buttonText}>Default Greeting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleButton}
            onPress={() => Alert.alert('Greeting', greetUser('Bob', 'Hi'))}
          >
            <Text style={styles.buttonText}>Custom Greeting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleButton}
            onPress={() => Alert.alert('Sum', `Sum: ${sumNumbers(1, 2, 3, 4, 5)}`)}
          >
            <Text style={styles.buttonText}>Sum Numbers (1,2,3,4,5)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleButton}
            onPress={() => Alert.alert('First User', getFirstUser())}
          >
            <Text style={styles.buttonText}>Get First User</Text>
          </TouchableOpacity>
        </View>
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
  note: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#7B1FA2',
  },
  statsText: {
    fontSize: 14,
    color: '#7B1FA2',
    marginBottom: 4,
  },
  usersContainer: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F57C00',
  },
  userItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userInfo: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  cityContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  cityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 4,
  },
  cityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cityCount: {
    fontSize: 14,
    color: '#2E7D32',
  },
  examplesContainer: {
    backgroundColor: '#FCE4EC',
    padding: 15,
    borderRadius: 8,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C2185B',
  },
  exampleButton: {
    backgroundColor: '#C2185B',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
});

export default ES6SyntaxDemo;