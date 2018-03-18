import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class BlastScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Blast!</Text>
      </View>
    );
  }
}