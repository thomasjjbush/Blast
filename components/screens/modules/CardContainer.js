import React, { Component } from 'react';
import { NativeModules, Text, TouchableHighlight, View, StyleSheet, Image, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import CardInteractions from './CardInteractions';
import Data from '../../../data/data.json';
import SwipeCard from './SwipeCard';

const { SpotifyModule } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.handleYup = this.handleYup.bind(this);
  }

  componentDidMount() {
    this.setState({ cards: Data.cards });
    SpotifyModule.initialized((error) => {
      if (error) {
        console.warn(error);
      }
    });
  }

  handleYup(card) {
    this.props.onSwipeRight(card);
  }

  render() {
    console.log(this.state.likedCards);
    return (
      <View style={styles.container}>
        <SwipeCards
          cards={this.state.cards}
          renderCard={cardData => <SwipeCard {...cardData} />}
            // renderNoMoreCards={() => <NoMoreCards />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          showYup={false}
          showNope={false}
        />
      </View>
    );
  }
}
