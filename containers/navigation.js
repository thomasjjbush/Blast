import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import NavButton from './NavButton';

const Path = '../img/';

export default class Navigation extends Component {
  onButtonPress() {
    console.log('suprisebitch')
  }

  render() {
    return (
      <View style={styles.navigation}>
          <NavButton handlePress={this.onButtonPress} title="Home" icon={require('../img/test.jpg')}/>
          <NavButton handlePress={this.onButtonPress} title="Discover" icon={require('../img/test.jpg')}/>
          <NavButton handlePress={this.onButtonPress} title="Likes" icon={require('../img/test.jpg')}/>
          <NavButton handlePress={this.onButtonPress} title="SuperLikes" icon={require('../img/test.jpg')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation: {
    flex: 0.08,
    flexDirection: 'row'
  }
});