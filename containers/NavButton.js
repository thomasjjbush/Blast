import React, { Component } from 'react';
import Button from 'react-native-button';
import { Image, StyleSheet } from 'react-native';

export default class NavButton extends Component {
  render() {
    return (
      <Button
        style={styles.button}
        styleDisabled={{color: 'red'}}
        onPress={this.props.handlePress}>
        <Image style={styles.icon} source={this.props.icon} />
        {this.props.title}
      </Button>
    );
  }
};

const styles = StyleSheet.create({
    
  button: {
    fontSize: 12,
    color: 'green',
    flex: 1,
    flexDirection: 'column'
  },

  icon: {
    width: 25,
    resizeMode: 'center'
  }

});