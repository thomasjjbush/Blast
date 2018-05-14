import React, { Component } from 'react';
import { NativeModules, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import CardContainer from './CardContainer';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Discover extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardContainer />
      </View>
    );
  }
}
