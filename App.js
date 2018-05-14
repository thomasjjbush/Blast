import React from 'react';
import { View, StyleSheet } from 'react-native';

import TabNavigator from './components/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f2',
  },
});

console.disableYellowBox = true;


export default function App() {
  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  );
}

