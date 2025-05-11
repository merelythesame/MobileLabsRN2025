import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FileManager from './components/FileManager';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <FileManager />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
