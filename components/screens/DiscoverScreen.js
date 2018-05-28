import React, { Component } from 'react';
import { Text, View, StatusBar, NativeModules, StyleSheet } from 'react-native';
import LogIn from './modules/LogIn';
import CardContainer from './modules/CardContainer';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 20,
  },
});

export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.setLogInState = this.setLogInState.bind(this);
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
  }
  componentDidMount() {
    this.checkIfLoggedIn(); // check if logged in
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillReceiveProps() {
    // this.logIn();
    console.log('component will receive props');
    console.log(this);
  }

  componentWillUpdate() {
    // this.logIn();
    console.log('component will update');
    console.log(this);
  }

  componentDidUpdate() {
    console.log('component did update');
    console.log(this);
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  setLogInState(loggedIn) {
    this.setState({ isLoggedIn: loggedIn });
  }

  checkIfLoggedIn() {
    console.log('in here sad cos so bad');
    SpotifyModule.loggedIn((res) => {
      console.log('qqqq', res);
      this.setLogInState(res);
    });
  }


  render() {
    let content;
    // console.log('DiscoverScreen render, this.state.isLoggedIn: ', this.state.isLoggedIn);

    if (this.state.isLoggedIn) {
      content = <CardContainer onSwipeRight={this.props.onSwipeRight} />;
    } else {
      content = <LogIn checkIfLoggedIn={this.checkIfLoggedIn} />;
    }
    return (
      <View style={styles.Container}>
        {/* <Text>{this.state.isLoggedIn}</Text> */}
        {content}
      </View>
    );
  }
}
