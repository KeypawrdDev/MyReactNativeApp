import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FetchUsersScreen from './FetchUsersScreen';

interface APIDemoProps {
  onNavigate: (screenName: string) => void;
  onBack: () => void;
}

const APIDemo: React.FC<APIDemoProps> = ({ onNavigate, onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('main');

  const handleNavigate = (screenName: string) => {
    setCurrentScreen(screenName);
  };

  const handleBack = () => {
    if (currentScreen === 'main') {
      onBack();
    } else {
      setCurrentScreen('main');
    }
  };

  // Show individual screens
  if (currentScreen === 'FetchUsersScreen') {
    return <FetchUsersScreen onBack={handleBack} />;
  }

  // Show main APIDemo
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>API Demo</Text>
      </View>
      
      {/* GET Request */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GET Request</Text>
        <Text style={styles.description}>
          • Fetch data from API{'\n'}
          • Handle loading states{'\n'}
          • Error handling
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate('FetchUsersScreen')}
        >
          <Text style={styles.buttonText}>Fetch Users</Text>
        </TouchableOpacity>
      </View>

      {/* POST Request */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>POST Request</Text>
        <Text style={styles.description}>
          • Create new data{'\n'}
          • Form submission{'\n'}
          • Response handling
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => onNavigate('CreatePostScreen')}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
      </View>

      {/* PUT Request */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PUT Request</Text>
        <Text style={styles.description}>
          • Update existing data{'\n'}
          • Form validation{'\n'}
          • Optimistic updates
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => onNavigate('UpdateUserScreen')}
        >
          <Text style={styles.buttonText}>Update User</Text>
        </TouchableOpacity>
      </View>

      {/* DELETE Request */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DELETE Request</Text>
        <Text style={styles.description}>
          • Remove data{'\n'}
          • Confirmation dialogs{'\n'}
          • List updates
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => onNavigate('DeleteItemScreen')}
        >
          <Text style={styles.buttonText}>Delete Item</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default APIDemo;
