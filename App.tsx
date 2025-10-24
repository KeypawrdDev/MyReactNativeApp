/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import DemoNavigator from './src/navigation/DemoNavigator';
import DemoViewer from './src/components/DemoViewer';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);

  const handleNavigate = (demoName: string) => {
    setCurrentDemo(demoName);
  };

  const handleBack = () => {
    setCurrentDemo(null);
  };

  return (
    <View style={styles.container}>
      {currentDemo ? (
        <DemoViewer demoName={currentDemo} onBack={handleBack} />
      ) : (
        <DemoNavigator onNavigate={handleNavigate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
