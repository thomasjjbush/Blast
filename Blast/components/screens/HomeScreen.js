import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';
import MoreInfoModal from './modules/MoreInfoModal';
import LikedCard from './modules/LikedCard';

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
});

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setModal = this.setModal.bind(this);
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }
  componentWillUnmount() {
    this.navListener.remove();
  }
  setModal() {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  render() {
    const likes = this.props.likedCards.map(card => (
      <LikedCard onPress={this.setModal} card={card} key={card.key} />
    ));
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MoreInfoModal check={this.state.modalVisible} toggle={this.setModal} />
        <HomeScreenHero />
        <View style={styles.row}>
          <Text style={styles.title}> Your likes
          </Text>
          <ScrollView style={styles.scrollView} horizontal>
            { likes }
          </ScrollView >
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Your super likes
          </Text>
          <ScrollView style={styles.scrollView} horizontal />
        </View>
      </View>
    );
  }
}
