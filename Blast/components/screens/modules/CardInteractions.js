import React, { Component } from 'react';
import { NativeModules, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spotify from 'rn-spotify-sdk';
import Data from '../../../data/data.json';

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
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    Spotify.setPlaying(!this.state.isPlaying).then((error) => {
      this.setState(prevState => ({
        isPlaying: !prevState.isPlaying,
      }));
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { this.props.startPlay(this.props.track); }}>
          <Icon name="step-backward" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPlay]} onPress={this.togglePlay}>
          <Icon name={this.state.isPlaying ? "pause" : "play"} size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Icon name="step-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}
