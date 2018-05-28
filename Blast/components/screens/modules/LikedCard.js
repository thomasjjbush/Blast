import React, { Component } from 'react';
import { NativeModules, Text, TouchableHighlight, View, StyleSheet, Image, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import CardInteractions from './CardInteractions';
import Data from '../../../data/data.json';
import SwipeCard from './SwipeCard';
import Spotify from 'rn-spotify-sdk';
import get from 'lodash/get';

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
    // this.handleYup = this.handleYup.bind(this);
  }

  componentWillMount() {
    // console.log(this.props)
    Spotify.getTrack(this.props.card.tracks[0].link).then((metadata) => {
      console.log(metadata);
      this.setState({ metadata });
    });
  }

  render() {
    const { card } = this.props;
    const { metadata } = this.state;
    console.log(metadata);
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
            <Text style={styles.likedCardText}>{get(metadata,['artists', '0', 'name'], '')}</Text>
          </View>
        </TouchableHighlight>
    )
  }
}
