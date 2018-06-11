import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, Image } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import get from 'lodash/get';
import truncate from '../../../utils/string-utils';

const styles = StyleSheet.create({
  likedCard: {
    marginRight: 10,
  },
  albumArt: {
    width: 114,
    height: 114,
  },
  likedCardText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
});

export default class LikedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: {},
    };
  }

  componentWillMount() {
    Spotify.getTrack(this.props.card.tracks[0].link).then((metadata) => {
      this.setState({ metadata });
    });
  }

  render() {
    const { card } = this.props;
    const { metadata } = this.state;
    return (
      <TouchableHighlight
        onPress={this.setModal}
        key={card.key}
        modalName={card.name}
        modalCopy={card.info}
        style={styles.likedCard}
      >
        <View>
          <Image
            style={styles.albumArt}
            source={{ uri: get(metadata, ['album', 'images', '1', 'url'], '') }}
          />
          <Text style={styles.likedCardText}>{truncate(get(metadata, ['artists', '0', 'name'], ''))}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
