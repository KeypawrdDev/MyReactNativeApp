import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

const PropsVsStateDemo: React.FC = () => {
  const [parentState, setParentState] = useState('Hello from Parent!');
  const [_childState, setChildState] = useState('Child State Value');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Props vs State Demo</Text>
      
      {/* Parent State Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parent Component State</Text>
        <Text style={styles.label}>Parent State: {parentState}</Text>
        
        <TextInput
          style={styles.input}
          value={parentState}
          onChangeText={setParentState}
          placeholder="Enter parent state value"
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setParentState('Parent State Updated!')}
        >
          <Text style={styles.buttonText}>Update Parent State</Text>
        </TouchableOpacity>
      </View>

      {/* Child Component with Props */}
      <ChildComponent 
        parentMessage={parentState}
        onChildStateChange={setChildState}
      />

      {/* State vs Props Explanation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Differences</Text>
        
        <View style={styles.comparison}>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonTitle}>Props</Text>
            <Text style={styles.comparisonText}>
              • Passed down from parent{'\n'}
              • Read-only in child{'\n'}
              • Changes trigger re-render{'\n'}
              • Used for communication
            </Text>
          </View>
          
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonTitle}>State</Text>
            <Text style={styles.comparisonText}>
              • Managed by component{'\n'}
              • Can be modified{'\n'}
              • Changes trigger re-render{'\n'}
              • Used for internal data
            </Text>
          </View>
        </View>
      </View>

      {/* Interactive Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Examples</Text>
        <Text style={styles.note}>
          • Change the parent state input above{'\n'}
          • Notice how it affects the child component{'\n'}
          • Try updating the child state independently{'\n'}
          • See how props flow down, state stays local
        </Text>
      </View>
    </ScrollView>
  );
};

// Child component that receives props
interface ChildProps {
  parentMessage: string;
  onChildStateChange: (value: string) => void;
}

const ChildComponent: React.FC<ChildProps> = ({ parentMessage, onChildStateChange }) => {
  const [childState, setChildState] = useState('Initial Child State');

  const updateChildState = () => {
    const newValue = `Child updated at ${new Date().toLocaleTimeString()}`;
    setChildState(newValue);
    onChildStateChange(newValue);
  };

  return (
    <View style={styles.childContainer}>
      <Text style={styles.childTitle}>Child Component</Text>
      
      {/* Props from parent */}
      <View style={styles.propSection}>
        <Text style={styles.propLabel}>Props from Parent:</Text>
        <Text style={styles.propValue}>{parentMessage}</Text>
      </View>
      
      {/* Child's own state */}
      <View style={styles.stateSection}>
        <Text style={styles.stateLabel}>Child's State:</Text>
        <Text style={styles.stateValue}>{childState}</Text>
        
        <TouchableOpacity 
          style={styles.childButton}
          onPress={updateChildState}
        >
          <Text style={styles.buttonText}>Update Child State</Text>
        </TouchableOpacity>
      </View>
      
      {/* Props vs State Visual */}
      <View style={styles.visualSection}>
        <Text style={styles.visualTitle}>Data Flow:</Text>
        <Text style={styles.visualText}>
          Parent State → Props → Child Component{'\n'}
          Child State → Local to Child Component
        </Text>
      </View>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  childContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
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
    marginBottom: 15,
    color: '#007AFF',
  },
  propSection: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  propLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  propValue: {
    fontSize: 16,
    color: '#1976D2',
  },
  stateSection: {
    backgroundColor: '#F3E5F5',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  stateLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 5,
  },
  stateValue: {
    fontSize: 16,
    color: '#7B1FA2',
    marginBottom: 10,
  },
  childButton: {
    backgroundColor: '#7B1FA2',
    padding: 10,
    borderRadius: 6,
  },
  visualSection: {
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 6,
  },
  visualTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 5,
  },
  visualText: {
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
  },
  comparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  comparisonText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  note: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PropsVsStateDemo;