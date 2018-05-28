import React, { Component } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';
import MoreInfoModal from './modules/MoreInfoModal';
import LikedArtists from './modules/LikedArtists';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100
  }
});

export default class LikesScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }
  componentWillUnmount() {
    this.navListener.remove();
  }
  render() {
    const likes = this.props.likedCards.map(card => (
      <LikedArtists onPress={this.setModal} key={card.key} image={card.albumArt} name={card.name} />
    ));
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
      </View>
    );
  }
}
