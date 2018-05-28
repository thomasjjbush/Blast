import React, { Component } from 'react';
import { Text, View, StatusBar, NativeModules, StyleSheet } from 'react-native';
import LogIn from './modules/LogIn';
import CardContainer from './modules/CardContainer';

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
  }
  componentDidMount() {
    // this.checkIfLoggedIn(); // check if logged in
    // this.navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('dark-content');
    // });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    let content;
    if (this.props.isLoggedIn) {
      content = <CardContainer onSwipeRight={this.props.onSwipeRight} />;
    } else {
      content = <LogIn setLogInStatus={this.props.setLogInStatus} />;
    }
    return (
      <View style={styles.Container}>
        {/* <Text>{this.state.isLoggedIn}</Text> */}
        {content}
      </View>
    );
  }
}
