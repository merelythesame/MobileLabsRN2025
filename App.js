import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar  } from 'react-native';
import FileManager from './components/FileManager';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="grey" />
          <FileManager />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
