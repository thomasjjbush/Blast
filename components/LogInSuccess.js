import React, { Component } from 'react';
import {
  NativeModules,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    height: 50,
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

export default class LogInSuccess extends Component {
  componentDidMount() {
    SpotifyModule.initialized((error) => {
      if (error) {
        console.warn(error);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>
          LogIn Success!
        </Text>
        <Text style={styles.normalText}>
          Select a song to start!
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            SpotifyModule.playSpotifyURI('spotify:track:2yNWwardt8VzlpNBWrGYD6', 0, 0.0, (error) => {
              console.log(error);
              if (error) {
                console.error('Something went wrong');
              }
            });
          }}
        >
          <Text style={styles.btnSong}>
            1. For Once In My Life - Stevie Wonder
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            SpotifyModule.playSpotifyURI('spotify:user:1134189733:playlist:077FStAgr8Qq3uBD99DjiE', 0, 0.0, (error) => {
              if (error) {
                console.error('Something went wrong');
              }
            });
            SpotifyModule.metadata((res) => { console.log(res); });
          }}
        >
          <Text style={styles.btnSong}>
            2. Redbone - Childish Gambino
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            SpotifyModule.playbackState((res) => {
              if (res.isPlaying) {
                SpotifyModule.setIsPlaying(false, (err) => {
                  if (err) {
                    console.warn('Pause', err);
                  }
                });
              } else {
                SpotifyModule.setIsPlaying(true, (err) => {
                  if (err) {
                    console.warn('Play', err);
                  }
                });
              }
            });
          }}
        >
          <Text style={styles.btnText}>
            Play/Pause
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
