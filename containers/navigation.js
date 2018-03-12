import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import NavButton from './NavButton';

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
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%',
    alignItems: 'flex-end'
  }

});
