import React, { Component } from 'react';
import { NativeModules, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Data from '../../../data/data.json';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f2',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonPlay: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    marginHorizontal: 10,
  },
});

export default class CardInteractions extends Component {
  play() {
    console.log('yo btich)');
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
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { this.props.startPlay(this.props.track); }}>
          <Icon name="step-backward" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPlay]} onPress={this.play}>
          <Icon name="play" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Icon name="step-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}
