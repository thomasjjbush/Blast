import React, { Component } from 'react';
import { Text, Image, NativeModules, TouchableHighlight, View, StyleSheet } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import buttonImage from '../../../assets/img/login-button-mobile.png';


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
    console.log('mounted');
  }
  render() {
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
                  console.log('do u get in heeere', error);
                    if (!error) {
                      console.log('log in success');
                      this.props.checkIfLoggedIn();
                      // SpotifyModule.loggedIn((fff) => {
                      //   console.log('ok now', fff);
                      //   this.props.setLogInState(fff);
                      // });
                    } else {
                      alert(error);
                    }
                  });
              } else {
                console.log('log in success');
                this.props.checkIfLoggedIn();
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
