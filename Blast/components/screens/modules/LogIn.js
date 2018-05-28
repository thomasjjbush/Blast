import React, { Component } from 'react';
import { Text, Image, NativeModules, TouchableHighlight, View, StyleSheet } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';

import buttonImage from '../../../assets/img/login-button-mobile.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 45,
    borderRadius: 64,
  },
  image: {
    width: 250,
    height: 250,
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  btnSong: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },

});

class LogIn extends Component {
  componentWillMount() {
    console.log('mounted');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            // Start Auth process
            Spotify.login().then((status) => {
              console.log(status);
              this.props.setLogInStatus(setLogInStatus);
            })
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={buttonImage}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

export default withNavigation(LogIn);
