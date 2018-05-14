import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';

export default class LikesScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      console.log('likesssss');
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Likes!</Text>
      </View>
    );
  }
}
