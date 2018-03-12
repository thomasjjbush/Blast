import React, { Component } from 'react';
import Button from 'react-native-button';
import { Image, Text, StyleSheet } from 'react-native';

export default class NavButton extends Component {
  render() {
    return (
      // <Button
      //   // style={styles.button}
      //   // styleDisabled={{color: 'red'}}
      //   onPress={this.props.handlePress}>
      //   <Image style={styles.icon} source={this.props.icon} />
      //   <Text>{this.props.title}</Text>
      // </Button>
      <Button
      style={{fontSize: 20, color: 'green'}}
      styleDisabled={{color: 'red'}}
      onPress={() => this._handlePress()}>
      <Image style={styles.icon} source={this.props.icon} />
      {this.props.title}
    </Button>
    );
  }
};

const styles = StyleSheet.create({
    
  button: {
    fontSize: 12,
    backgroundColor: 'green',
    flex: 0,
    flexDirection: 'column'
  },

  icon: {
    width: 25,
    height: 25,
    // resizeMode: 'center'
  }

});