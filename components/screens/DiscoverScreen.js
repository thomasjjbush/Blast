import React, { Component } from 'react';
import { Text, View, StatusBar, NativeModules, StyleSheet } from 'react-native';
import LogIn from './modules/LogIn';
import Discover from './modules/Discover';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 20
  }
});

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
      content = <Discover />;
    } else {
      content = <LogIn logIn={this.logIn} />;
    }
    return (
      <View style={styles.Container}>
        {content}
      </View>
    );
  }
}
