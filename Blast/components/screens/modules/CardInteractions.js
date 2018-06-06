import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spotify from 'rn-spotify-sdk';

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
      console.log(error);
      this.setState(prevState => ({
        isPlaying: !prevState.isPlaying,
      }));
    });
  }

  // spotifyPlaylistCheck() {
  //   console.log(this, 'heeere');
  //   Spotify.getAuthAsync().then((auth) => {
  //     console.log('auth: ', auth);
  //     fetch('https://api.spotify.com/v1/me/playlists', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${auth.accessToken}`,
  //       },
  //     }).then(res => res.json())
  //       .catch(error => console.error('Error:', error))
  //       .then(response => {
  //         const playlistExists = response.items.some((playlist) => playlist.name === 'My Blast Playlist');
  //         if (!playlistExists) {
  //           console.log('playlist dont exist');
  //           Spotify.getMe().then((user) => {
  //             Spotify.sendRequest(`v1/users/${user.id}/playlists`, 'POST', { name: 'My Blast Playlist', public: false }, true).then((playlist) => {
  //               console.log('create', playlist);
  //             }).catch((error) => { console.log(error); });
  //           });
  //         }
  //         else {
  //           console.log('all good');
  //         }
  //       });
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { this.props.startPlay(this.props.track); }} // need to remove this
        >
          <Icon name="step-backward" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPlay]} onPress={this.togglePlay}>
          <Icon name={this.state.isPlaying ? 'pause' : 'play'} size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.spotifyPlaylistCheck}>
          <Icon name="step-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}
