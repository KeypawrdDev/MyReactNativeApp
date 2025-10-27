// Suggested structure for NavigationDemo.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import APIDemo from './APIDemo';

const NavigationDemo: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'api'>('main');

  const handleNavigate = (screenName: string) => {
    if (screenName === 'APIDemo') {
      setCurrentScreen('api');
    }
  };  

  const handleBack = () => {
    setCurrentScreen('main');
  };

  // Show APIDemo if navigated to it
  if (currentScreen === 'api') {
    return <APIDemo onNavigate={handleNavigate} onBack={handleBack} />;
  }

  // Show main NavigationDemo
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Navigation Demo</Text>
      
      {/* API Demo Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Demo</Text>
        <Text style={styles.description}>
          • GET, POST, PUT, DELETE requests{'\n'}
          • Error handling & loading states{'\n'}
          • Real API examples
        </Text>
        <TouchableOpacity 
          style={styles.apiButton}
          onPress={() => handleNavigate('APIDemo')}
        >
          <Text style={styles.buttonText}>API Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Stack Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stack Navigation</Text>
        <Text style={styles.description}>
          • Navigate between screens{'\n'}
          • Pass parameters{'\n'}
          • Handle back navigation
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Stack Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tab Navigation</Text>
        <Text style={styles.description}>
          • Bottom tabs{'\n'}
          • Top tabs{'\n'}
          • Tab badges
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tab Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drawer Navigation</Text>
        <Text style={styles.description}>
          • Side drawer menu{'\n'}
          • Custom drawer content{'\n'}
          • Drawer gestures
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Drawer Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Patterns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Patterns</Text>
        <Text style={styles.description}>
          • Deep linking{'\n'}
          • Authentication flow{'\n'}
          • Modal presentations
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Patterns Demo</Text>
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
  },
  apiButton: {
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

export default NavigationDemo;