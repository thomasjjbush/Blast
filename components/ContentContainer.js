import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default class ContentContainer extends Component {

  render() {
    return (
      <FlatList style={styles.contentContainer}>
          
      </FlatList>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0.92,
    flexDirection: 'row'
  }
});
