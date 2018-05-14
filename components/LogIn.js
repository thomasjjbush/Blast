import React, { Component } from 'react';
import { Text, Image, NativeModules, TouchableHighlight, View, StyleSheet } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';

import LogInSuccess from './LogInSuccess';
import buttonImage from '../assets/img/login-button-mobile.png';
import SettingsScreen from './screens/SettingsScreen';

const { SpotifyModule } = NativeModules;

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
    SpotifyModule.initWithCredentials('d37857c44487439686430b93237f9c9b', 'blast-login://callback', ['streaming'], (error) => {
      if (error) {
        console.log(`some ${error}`);
      }
    });
  }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            // Start Auth process
            SpotifyModule.loggedIn((res) => {
              console.log(res);
              if (!res) {
                SpotifyModule.startAuthenticationFlow((error) => {
                    if (!error) {
                      console.log(this.props.navigation.getParam('screen'));
                    }
                      // alert(error);
                  });
              } else {
                console.log(this.props.navigation.getParam('screen'));
              }
            });
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
