import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Image } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    backgroundColor: '#DCDCDC',
    height: 200,
    marginBottom: 10,
  },
  title: {
    color: '#d61d6b',
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: 'bold',
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
    const likes = [];
    for (let i = 0; i < 25; i += 1) {
      likes.push(<Image
        key={i}
        style={{ width: 100, height: 100 }}
        source={{ uri: 'https://loremflickr.com/100/100/dog' }}
      />);
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HomeScreenHero />
        <View style={styles.row}>
          <Text style={styles.title}> Your likes
          </Text>
          <ScrollView horizontal>
            {likes}
          </ScrollView >
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Your super likes or whatever
          </Text>
          <ScrollView horizontal>
            {likes}
          </ScrollView >
        </View>
      </View>
    );
  }
}
