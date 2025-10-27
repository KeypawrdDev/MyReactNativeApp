import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import only the first demo component
import HooksDemo from '../demos/Day1/HooksDemo';
import StateManagementDemo from '../demos/Day1/StateManagementDemo';
import PropsVsStateDemo from '../demos/Day1/PropsVsStateDemo';
import LifecycleDemo from '../demos/Day1/LifecycleDemo';
import AsyncDemo from '../demos/Day1/AsyncDemo';
import ES6SyntaxDemo from '../demos/Day1/ES6SyntaxDemo';
// Add NavigationDemo import
import NavigationDemo from '../demos/Day2/NavigationDemo';

interface DemoNavigatorProps {
  onNavigate: (demoName: string) => void;
}

const DemoNavigator: React.FC<DemoNavigatorProps> = ({ onNavigate }) => {
  const demos = [
    { name: 'HooksDemo', title: 'React Hooks Demo', component: HooksDemo },
    { name: 'StateManagementDemo', title: 'State Management Demo', component: StateManagementDemo },
    { name: 'PropsVsStateDemo', title: 'Props vs State Demo', component: PropsVsStateDemo },
    { name: 'LifecycleDemo', title: 'Lifecycle Demo', component: LifecycleDemo },
    { name: 'AsyncDemo', title: 'Async Demo', component: AsyncDemo },
    { name: 'ES6SyntaxDemo', title: 'ES6 Syntax Demo', component: ES6SyntaxDemo },
    // Add NavigationDemo to the demos array
    { name: 'NavigationDemo', title: 'React Navigation Demo', component: NavigationDemo },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Interview Prep - Day 1 & 2</Text>
      <Text style={styles.subtitle}>Start with Hooks Demo</Text>
      {demos.map((demo) => (
        <TouchableOpacity
          key={demo.name}
          style={styles.demoButton}
          onPress={() => onNavigate(demo.name)}
        >
          <Text style={styles.demoButtonText}>{demo.title}</Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  demoButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  demoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DemoNavigator;
