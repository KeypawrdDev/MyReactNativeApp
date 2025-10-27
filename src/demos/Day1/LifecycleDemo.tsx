import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const LifecycleDemo: React.FC = () => {
  const [showChild, setShowChild] = useState(false);
  const [mountCount, setMountCount] = useState(0);

  // Track how many times child component has been mounted
  useEffect(() => {
    if (showChild) {
      setMountCount(prev => prev + 1);
    }
  }, [showChild]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Component Lifecycle Demo</Text>
      
      {/* Toggle button to show/hide child component */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setShowChild(!showChild)}
      >
        <Text style={styles.buttonText}>
          {showChild ? 'Hide' : 'Show'} Child Component
        </Text>
      </TouchableOpacity>

      {/* Info about mount count */}
      <Text style={styles.info}>
        Child has been mounted {mountCount} times
      </Text>

      {/* Child component that mounts/unmounts */}
      {showChild && <ChildComponent />}

      {/* Lifecycle explanation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lifecycle Events</Text>
        <Text style={styles.note}>
          • Click "Show" to mount the child component{'\n'}
          • Click "Hide" to unmount the child component{'\n'}
          • Watch the console for lifecycle logs{'\n'}
          • Notice how timer stops when component unmounts
        </Text>
      </View>
    </ScrollView>
  );
};

// Child component to demonstrate lifecycle
const ChildComponent: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mount/Unmount effect with cleanup
  useEffect(() => {
    console.log('🟢 Child component MOUNTED');
    
    // Simulate API call
    const fetchData = async () => {
      console.log('📡 Fetching data...');
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setData(['Item 1', 'Item 2', 'Item 3']);
        setIsLoading(false);
        console.log('✅ Data fetched successfully');
      }, 2000);
    };

    // Start timer
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    fetchData();

    // Cleanup function - runs on unmount
    return () => {
      console.log('🔴 Child component UNMOUNTING - cleaning up');
      clearInterval(interval);
      console.log('🧹 Timer cleared, cleanup complete');
    };
  }, []); // Empty dependency = only on mount/unmount

  return (
    <View style={styles.childContainer}>
      <Text style={styles.childTitle}>Child Component</Text>
      <Text style={styles.timer}>Timer: {timer}s</Text>
      
      {isLoading ? (
        <Text style={styles.loading}>Loading data...</Text>
      ) : (
        <Text style={styles.data}>
          Data: {data.join(', ')}
        </Text>
      )}
      
      <TouchableOpacity 
        style={styles.alertButton}
        onPress={() => Alert.alert('Child Component', 'I am still alive!')}
      >
        <Text style={styles.buttonText}>Test Alert</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  childContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  loading: {
    fontSize: 14,
    color: '#FF9500',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  data: {
    fontSize: 14,
    color: '#34C759',
    marginBottom: 15,
  },
  alertButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 6,
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
});

export default LifecycleDemo;