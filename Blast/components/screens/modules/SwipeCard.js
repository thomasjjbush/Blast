import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import get from 'lodash/get';
import { playTrack } from '../../../utils/spotify/spotify-utils';

import CardInteractions from './CardInteractions';

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
  constructor(props) {
    super(props);
    this.state = {
      metadata: {},
    };
  }

  componentDidMount() {
    Spotify.getTrack(this.props.tracks[0].link).then((metadata) => {
      this.setState({ metadata }, () => {
        playTrack(this.props.tracks[0].link);
      });
    });
  }

  render() {
    const { key, tracks } = this.props;
    const { album, name } = this.state.metadata;
    return (
      <View style={styles.container}>
        <View key={key} style={styles.card}>
          <Image
            style={styles.albumArt}
            source={{ uri: get(album, ['images', '1', 'url'], '') }} // todo: use fallback image
          />
          <Text style={styles.artist}>{get(album, ['artists', '0', 'name'], '')}</Text>
          <Text style={styles.songtitle}>{name}</Text>
          <CardInteractions startPlay={playTrack} track={tracks[0].link} />
        </View>
      </View>
    );
  }
}

export default withNavigation(SwipeCard);
