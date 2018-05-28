import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  likedCard: {
    marginRight: 10,
    width: 114
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
  }
});

export default class LikedArtists extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.likedCard}>
        <View>
          <Image
            style={styles.albumArt}
            source={{ uri: this.props.image }}
          />
          <Text style={styles.likedCardText}>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
