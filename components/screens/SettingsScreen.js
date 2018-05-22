import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableHighlight, NativeModules } from 'react-native';

const { SpotifyModule } = NativeModules;

export default class SettingsScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  logOut() {
    SpotifyModule.logout();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <TouchableHighlight onPress={this.logOut}>
          <Text>Log out of spotify</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
