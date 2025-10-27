import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HooksDemo from '../demos/Day1/HooksDemo';
import StateManagementDemo from '../demos/Day1/StateManagementDemo';
import PropsVsStateDemo from '../demos/Day1/PropsVsStateDemo';
import LifecycleDemo from '../demos/Day1/LifecycleDemo';
import AsyncDemo from '../demos/Day1/AsyncDemo';
import ES6SyntaxDemo from '../demos/Day1/ES6SyntaxDemo';
// Add NavigationDemo import
import NavigationDemo from '../demos/Day2/NavigationDemo';

interface DemoViewerProps {
  demoName: string;
  onBack: () => void;
}

const DemoViewer: React.FC<DemoViewerProps> = ({ demoName, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{demoName}</Text>
      </View>
      <View style={styles.content}>
        {(() => {
          switch (demoName) {
            case 'HooksDemo':
              return <HooksDemo />;
            case 'StateManagementDemo':
              return <StateManagementDemo />;
            case 'PropsVsStateDemo':
              return <PropsVsStateDemo />;
            case 'LifecycleDemo':
              return <LifecycleDemo />;
            case 'AsyncDemo':
              return <AsyncDemo />;
            case 'ES6SyntaxDemo':
              return <ES6SyntaxDemo />;
            // Add NavigationDemo case
            case 'NavigationDemo':
              return <NavigationDemo />;
            default:
              return (
                <Text style={styles.placeholder}>
                  Please select a demo from the list
                </Text>
              );
          }
        })()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DemoViewer;
