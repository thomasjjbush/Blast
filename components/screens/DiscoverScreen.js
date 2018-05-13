import React, { Component } from 'react';
import { Text, ScrollView, StatusBar } from 'react-native';
import LogIn from '../LogIn';
import LogInSuccess from '../LogInSuccess';

export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return (
      <ScrollView
        centerContent
        style={{ marginTop: 20 }}
      >
        <Text>Discover!</Text>
        <LogIn />
        <LogInSuccess />
      </ScrollView>
    );
  }
}
