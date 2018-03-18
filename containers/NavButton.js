import React, { Component } from 'react';
import Button from 'react-native-button';
import { Dimensions, Image, Text, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

export default class NavButton extends Component {


  render() {
    return (
      <Button
        style={styles.button}>
          
          <Text style={styles.text}>{this.props.title}</Text>
      </Button>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: width / 4
  }
});