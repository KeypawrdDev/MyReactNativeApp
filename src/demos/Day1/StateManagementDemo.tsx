import React, { createContext, useContext, useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

// Context API Demo
interface UserContextType {
  user: {
    name: string;
    email: string;
    age: number;
  };
  updateUser: (updates: Partial<UserContextType['user']>) => void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// User Provider Component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
  });

  const updateUser = (updates: Partial<UserContextType['user']>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const resetUser = () => {
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

// useReducer Demo
interface TodoState {
  todos: Array<{
    id: number;
    text: string;
    completed: boolean;
  }>;
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

const StateManagementDemo: React.FC = () => {
  return (
    <UserProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>State Management Demo</Text>
        
        {/* Context API Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Context API</Text>
          <UserProfile />
          <UserEditor />
        </View>

        {/* useReducer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useReducer</Text>
          <TodoApp />
        </View>

        {/* State Management Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>State Management Patterns</Text>
          <Text style={styles.note}>
            • Context API: Global state without props drilling{'\n'}
            • useReducer: Complex state logic with actions{'\n'}
            • useState: Simple local state{'\n'}
            • Custom hooks: Reusable state logic
          </Text>
        </View>
      </ScrollView>
    </UserProvider>
  );
};

// User Profile Component (consumes context)
const UserProfile: React.FC = () => {
  const { user } = useUser();

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>User Profile</Text>
      <Text style={styles.profileText}>Name: {user.name}</Text>
      <Text style={styles.profileText}>Email: {user.email}</Text>
      <Text style={styles.profileText}>Age: {user.age}</Text>
    </View>
  );
};

// User Editor Component (updates context)
const UserEditor: React.FC = () => {
  const { user, updateUser, resetUser } = useUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());

  const handleSave = () => {
    updateUser({
      name,
      email,
      age: parseInt(age) || 0,
    });
    Alert.alert('Success', 'User updated successfully!');
  };

  return (
    <View style={styles.editorContainer}>
      <Text style={styles.editorTitle}>Edit User</Text>
      
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={resetUser}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Todo App with useReducer
const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
  });

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoTitle}>Todo App</Text>
      
      {/* Add Todo */}
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.todoInput}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {(['all', 'active', 'completed'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              state.filter === filter && styles.activeFilter
            ]}
            onPress={() => dispatch({ type: 'SET_FILTER', payload: filter })}
          >
            <Text style={[
              styles.filterText,
              state.filter === filter && styles.activeFilterText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Todo List */}
      <View style={styles.todoList}>
        {filteredTodos.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoTextContainer}
              onPress={() => toggleTodo(todo.id)}
            >
              <Text style={[
                styles.todoText,
                todo.completed && styles.completedTodo
              ]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(todo.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Clear Completed */}
      {state.todos.some(todo => todo.completed) && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          <Text style={styles.buttonText}>Clear Completed</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.todoStats}>
        Total: {state.todos.length} | 
        Active: {state.todos.filter(t => !t.completed).length} | 
        Completed: {state.todos.filter(t => t.completed).length}
      </Text>
    </View>
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
  profileContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976D2',
  },
  profileText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 4,
  },
  editorContainer: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 8,
  },
  editorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7B1FA2',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  todoContainer: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#F57C00',
  },
  addTodoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    textAlign: 'center',
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoList: {
    marginBottom: 15,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 6,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 14,
    color: '#333',
  },
  completedTodo: {
    textDecorationLine: 'line-through',
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
  clearButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  todoStats: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default StateManagementDemo;