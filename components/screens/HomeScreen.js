import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Image } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    backgroundColor: '#FFF',
    height: 194,
    marginBottom: 10,
  },
  title: {
    color: '#d61d6b',
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    marginHorizontal: 10,
  },
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

export default class HomeScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    const likes = this.props.likedCards.map(card => (
      <View style={styles.likedCard} key={card.key}>
        <Image
          style={styles.albumArt}
          source={{ uri: card.albumArt }}
        />
        <Text style={styles.likedCardText}>{card.name}</Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HomeScreenHero />
        <View style={styles.row}>
          <Text style={styles.title}> Your likes
          </Text>
          <ScrollView style={styles.scrollView} horizontal>
            {likes}
          </ScrollView >
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Your super likes
          </Text>
          <ScrollView style={styles.scrollView} horizontal>
            {likes}
          </ScrollView >
        </View>
      </View>
    );
  }
}
