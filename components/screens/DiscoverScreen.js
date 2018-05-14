import React, { Component } from 'react';
import { Text, ScrollView, StatusBar, NativeModules } from 'react-native';
import LogIn from '../LogIn';
import LogInSuccess from '../LogInSuccess';

const { SpotifyModule } = NativeModules;

export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.logIn = this.logIn.bind(this);
  }
  componentDidMount() {
    this.logIn(); // check if logged in
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  logIn() {
    SpotifyModule.loggedIn((res) => {
      console.log(res);
      this.setState({ isLoggedIn: res });
    });
  }

  render() {
    let content;
    if (this.state.isLoggedIn) {
      content = <LogInSuccess />;
    } else {
      content = <LogIn logIn={this.logIn} />;
    }
    return (
      <ScrollView
        centerContent
        style={{ marginTop: 20 }}
      >
        <Text>Discover!</Text>
        {content}
      </ScrollView>
    );
  }
}
