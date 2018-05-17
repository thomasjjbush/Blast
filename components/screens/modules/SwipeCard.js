import React, { Component } from 'react';
import { NativeModules, Text, TouchableHighlight, View, StyleSheet, Image, Dimensions } from 'react-native';
import CardInteractions from './CardInteractions';
import { withNavigation } from 'react-navigation';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#fff',
    shadowOpacity: 0.55,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  albumArt: {
    width: 285,
    height: 285,
    marginTop: 17,
  },
  artist: {
    color: '#d61d6b',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  songtitle: {
    paddingBottom: 10,
  },
});

class SwipeCard extends Component {
  componentDidMount() {
    SpotifyModule.initialized((error) => {
      console.warn(error);
    });
  }

  play(track) {
    console.log('yo btich)');
    SpotifyModule.playSpotifyURI(`spotify:track:${track}`, 0, 0.0, (error) => {
      console.log(error);
      if (error) {
        console.error('Something went wrong');
      }
    });
  }

  render() {
    const {
 key, albumArt, name, tracks 
} = this.props;
    // SpotifyModule.playSpotifyURI(`spotify:track:${tracks[0].link}`, 0, 0.0, (error) => {
    //   console.log(error);
    //   if (error) {
    //     console.error('Something went wrong');
    //   }
    // });
    return (
      <View style={styles.container}>
        <View key={key} style={styles.card}>
          <Image
            style={styles.albumArt}
            source={{ uri: albumArt }}
          />
          <Text style={styles.artist}>{name}</Text>
          <Text style={styles.songtitle}>{tracks[0].name}</Text>
          <CardInteractions startPlay={this.play} track={tracks[0].link} />
        </View>
      </View>
    );
  }
}

export default withNavigation(SwipeCard);
